const itSchool = {
  // свойства
  name: "IT Hillel School",
  discription: "Online School IT",
  maxGroupCount: 5,
  maxStudentsCountPerGroup: 11,
 
  // свойства-массивы
  availableCourses: ["Front-end Pro", "Front-end Basic"],
  startedGroups: [],
  __callbacks: {},

  __supportedEventTypes: {
    GROUP_STARTED: "GROUP_STARTED",
    GROUP_ENDED: "GROUP_ENDED"
  },

  // started group ---- {courseName: "Front-end Pro", amountOfStudents: 10}

  // методы
  startLearningGroup(courseName, amountOfStudents) {

    if(this.availableCourses.includes(courseName)){
      if (amountOfStudents <= this.maxStudentsCountPerGroup) {
        if(!this.startedGroups.some((startedGroup) => startedGroup.courseName === courseName)) {
          this.startedGroups.push({courseName, amountOfStudents});
          this.dispatch(this.__supportedEventTypes.GROUP_STARTED, courseName);
        } else {
          console.log(`Group with ${courseName} course already started.`);
        }
      } else {
        console.log(`We not supported ${amountOfStudents} amount of students. Max supported students count per group in ${courseName}: ${this.maxStudentsCountPerGroup}`)
      }
    } else {
      console.log(`Sorry, course ${courseName} not supported.`)
    }
  },

  endLearningGroup(courseName) {
    if (this.startedGroups.some((startedGroup) => startedGroup.courseName === courseName)){
      this.startedGroups = this.startedGroups.filter((startedGroup) => startedGroup.courseName !== courseName);
      this.dispatch(this.__supportedEventTypes.GROUP_ENDED, courseName);
    } else {
      console.log(`You are trying to finish not existing learning ${courseName} group!`);
    }
  },

  on(eventName, callback){
    if(eventName in this.__supportedEventTypes) this.__callbacks[eventName] = callback;
  },

  dispatch(eventName, data) {
    this.__callbacks[eventName] && this.__callbacks[eventName](data);
  }
};


console.log(itSchool);

itSchool.on(
  itSchool.__supportedEventTypes.GROUP_STARTED,
  (courseName) => console.log(`Started ${courseName} group, congratulations! ;)`),
);


itSchool.on(
  itSchool.__supportedEventTypes.GROUP_ENDED,
  (courseName) => console.log(`Group with ${courseName} successfully finished!`),
);



// старт групп
itSchool.startLearningGroup("Front-end Pro", 10);
itSchool.startLearningGroup("Front-end Basic", 13);
itSchool.startLearningGroup("Python Basic", 6);

// // конец групп
itSchool.endLearningGroup("Front-end Basic");
itSchool.endLearningGroup("Python Basic");
itSchool.endLearningGroup("Front-end Pro");

