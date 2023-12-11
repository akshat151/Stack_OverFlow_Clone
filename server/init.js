const bcrypt = require('bcrypt');

let userArgs = process.argv.slice(2);

if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid MongoDB URL as the first argument');
    return;
}

let Tag = require('./models/tags')
let Answer = require('./models/answers')
let Question = require('./models/questions')
let User = require('./models/users.js');
let Comment = require('./models/comments.js');

let mongoose = require('mongoose');
let mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let tags = [];
let answers = [];
let comments = [];

function tagCreate(name, tag_added_by) {
    tagDetail = { name: name };
    if (tag_added_by !== false) tagDetail.tag_added_by = tag_added_by;
    let tag = new Tag(tagDetail);
    return tag.save();
}

function commentCreate(comment, comment_by, comment_date_time, votes) {
    const commentDetail = {
        comment: comment,
        comment_by: comment_by,
        comment_date_time: comment_date_time,
        votes: votes || 0,
    };
    const addComment = new Comment(commentDetail);
    return addComment.save();
}


async function userCreate(username, email, password, reputation, registration_date_time) {
  let userdetail = {};

  if (username !== false) userdetail.username = username;
  if (email !== false) userdetail.email = email;

  if (password !== false) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    userdetail.password = hashedPassword;
  }

  if (registration_date_time !== false) userdetail.registration_date_time = registration_date_time;
  reputation === 0 ? (userdetail.reputation = 0) : (userdetail.reputation = reputation);

  let user = new User(userdetail);
  return user.save();
}

function answerCreate(text, ans_by, ans_date_time, comments, votes) {
    answerdetail = { text: text };
    if (ans_by !== false) answerdetail.ans_by = ans_by;
    if (ans_date_time !== false) answerdetail.ans_date_time = ans_date_time;
    if (comments !== false) answerdetail.comments = comments;
    votes === 0 ? answerdetail.votes = 0 : answerdetail.votes = votes;
    let answer = new Answer(answerdetail);
    return answer.save();
}

function questionCreate(title, text, tags, askedBy, ask_date_time, answers, comments, views, votes, last_answer_time) {
    qstndetail = {
        title: title,
        text: text,
        tags: tags,
        askedBy: askedBy
    };
    if (answers !== false) qstndetail.answers = answers;
    if (comments !== false) qstndetail.comments = comments;
    if (ask_date_time !== false) qstndetail.ask_date_time = ask_date_time;
    if (views !== false) qstndetail.views = views;
    votes === 0 ? qstndetail.votes = 0 : qstndetail.votes = votes;
    if (last_answer_time !== false) qstndetail.last_answer_time = last_answer_time;
    let qstn = new Question(qstndetail);
    return qstn.save();
}


const populate = async () => {
    let u1 = await userCreate("akshat15", "khare.aks@northeastern.edu", "Khare123", 50, new Date('2023-11-25T03:30:00'));
    let u2 = await userCreate("amisha12", "tiwari.ami@northeastern.edu", "Tiwari123", 0, new Date('2023-11-25T03:45:00'));
    let u3 = await userCreate("iron_man", "tony12@gmail.com", "stark123", 70, new Date('2023-10-25T03:30:00'));
    let t1 = await tagCreate('react', "JoJi John");
    let t2 = await tagCreate('javascript', "saltypeter");
    let t3 = await tagCreate('android-studio', "joji john");
    let t4 = await tagCreate('shared-preferences', "saltypeter");
    let c1 = await commentCreate("Good Questions", "joji john", new Date('2023-11-25T07:45:00'), 10);
    let c2 = await commentCreate("Awesome Questions", "saltypeter", new Date('2023-11-25T07:46:00'), 35);
    let c3 = await commentCreate("Ok Questions", "joji john", new Date('2023-11-25T07:47:00'), 60);
    let c4 = await commentCreate("OK Answer", "saltypeter", new Date('2023-11-25T07:48:00',), 0);
    let a1 = await answerCreate('React Router is mostly a wrapper around the history library. history handles interaction with the browser\'s window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don\'t have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.', "John Wick", new Date('2023-11-20T03:24:42'), [c1, c2], 0);
    let a2 = await answerCreate('On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn\'t change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router.', "Jonny", new Date('2023-11-25T08:24:00'), [c2, c3], 5);
    let a3 = await answerCreate('Consider using apply() instead; commit writes its data to persistent storage immediately, whereas apply will handle it in the background.', "Natalie", new Date('2023-11-18T09:24:00'), [c1], 0);
    let a4 = await answerCreate('YourPreference yourPreference = YourPreference.getInstance(context); yourPreference.saveData(YOUR_KEY,YOUR_VALUE);', "Monica", new Date('2023-11-12T03:30:00'), [c4], 0);
    let a5 = await answerCreate('I just found all the above examples just too confusing, so I wrote my own. ', "Ross", new Date('2023-11-01T15:24:19'), [c3, c4], 5);
    await questionCreate('Programmatically navigate using React router', 'the alert shows the proper index for the li clicked, and when I alert the variable within the last function I\'m calling, moveToNextImage(stepClicked), the same value shows but the animation isn\'t happening. This works many other ways, but I\'m trying to pass the index value of the list item clicked to use for the math to calculate.', [t1, t2], "JoJi John", new Date('2022-01-20T03:24:00'), [a1, a2], [c1, c2], 121, 2, new Date('2023-11-25T08:24:00'));
    await questionCreate('android studio save string shared preference, start activity and load the saved string', 'I am using bottom navigation view but am using custom navigation, so my fragments are not recreated every time I switch to a different view. I just hide/show my fragments depending on the icon selected. The problem I am facing is that whenever a config change happens (dark/light theme), my app crashes. I have 2 fragments in this activity and the below code is what I am using to refrain them from being recreated.', [t3, t4, t2], "saltyPeter", new Date('2023-10-01T11:24:30'), [a3, a4, a5], [c3, c4], 129, 5, new Date('2023-11-12T03:30:00'));
    if (db) db.close();
    console.log('done');
}

populate()
    .catch((err) => {
        console.log('ERROR: ' + err);
        if (db) db.close();
    });

console.log('processing ...');