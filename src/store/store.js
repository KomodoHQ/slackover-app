import API from '../api'

const messagesApi = API.firestore().collection("messages");

// const newMessages = [
//     { message: "Hello", createdAt: new Date(), userId: "pMKR3dqINHZYCCs6I5UDZXziOqI3", sentBy: "Ian", channelName: 'general' },
//     { message: "Morning!", createdAt: new Date(), userId: "oc3uaqD03KQG3WAURPuFJPVTwjA3", sentBy: "Daniel", channelName: 'general' },
//     { message: "What's the plan today?", createdAt: new Date(), userId: "oc3uaqD03KQG3WAURPuFJPVTwjA3", sentBy: "Daniel", channelName: 'general' },
//     { message: "Read emails...", createdAt: new Date(), userId: "pMKR3dqINHZYCCs6I5UDZXziOqI3", sentBy: "Ian", channelName: 'general' },
//     { message: "OK", createdAt: new Date(), userId: "oc3uaqD03KQG3WAURPuFJPVTwjA3", sentBy: "Daniel", channelName: 'general' },
// ];

export const startRealtimeMessagesStreamWithChannel = (channel, cb) => {
    messagesApi
        .where("channelName", "==", channel)
        .orderBy("createdAt", "desc")
        .limit(10)
        .onSnapshot(async querySnapshot => {
        
            const newMessages = querySnapshot && querySnapshot.docs ? 
                querySnapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id
                    }))
                : [];

            if (cb) {
                cb(null, getMessagesSortedByDate(newMessages));
            }
            
        }, (error) => {
            if (cb) {
                cb(error, []);
            }
        })
};

// Filter
export const getMessagesInChannel = (messages, channel) => messages.filter(message => message.channelName === channel);
export const getMessagesByUser = (messages, userId) => messages.filter(message => message.userId === userId)
export const getLastNMessages = (messages, n) => messages.slice(1).slice(-n);
export const getMessagesSortedByDate = (messages) => { 
    const sortedMessages = messages.sort((firstMessage, secondMessage) => {
        return (firstMessage.createdAt.seconds > secondMessage.createdAt.seconds) ? 1 : -1
    });

    return sortedMessages;
};

export default messagesApi;