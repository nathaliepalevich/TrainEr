

const socketIO = require('socket.io')
const LessonService = require('../api/lesson/LessonService.js') 
// const RoomService = require('./RoomService.js');

let io;
let activeUsersCount = 0;

function setup(http) {
     io = socketIO(http);
     io.on('connection', function (socket) {
          activeUsersCount++

    socket.on('chat join',( {user,img, lessonId}) => {
        socket.join(lessonId);
        const msg = {
            from: 'System',
            img: `${img}`,
            txt: `${user} Joined`
        }
        io.in(lessonId).emit('chat newMsg', msg)

    });
        socket.on('disconnect', ( {user,lessonId}) => {
                     const msg = {
                          from: 'System',
                          txt: `${user} Left`
                      }
            io.in(lessonId).emit('chat newMsg', msg)
                activeUsersCount--
                });
     console.log('activeUsersCount', activeUsersCount);
    
     socket.on('chat msg',async (msg, lessonId) =>  {
        var lessonDB = await LessonService.getLessonById(lessonId)
        lessonDB.msgs.push(msg)
        LessonService.updateLesson(lessonDB)
          io.in(lessonId).emit('chat newMsg', msg)
        });

    });
 }
 
 module.exports = {
     setup ,
     io
 }



