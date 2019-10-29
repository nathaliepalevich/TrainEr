
// This is a room service that allows up to 2 people in a room


module.exports = {
    placeInRoom
}
 const gRooms = [];
 
 function placeInRoom(user, lessonId) {
     console.log('user, lessonId', user, lessonId);
     
     let room = gRooms.find(room => room.id === lessonId);
     if (room) {
         room.members.find(member => member === user);
        } else {
            room = {
                id: lessonId,
                members: [user]
            };
            gRooms.push(room)
            console.log('room from room servicde', room);
            console.log('gRooms from room servicde', gRooms);
     }
 
     return room;
 }