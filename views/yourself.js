function Module(id, parent) {
    this.id = id;
    this.exports = {};
    this.parent=parent;
}

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { customLogger, requestTimeLogger } = require('./middleware/customMiddleware');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(customLogger); 
app.use(requestTimeLogger);

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

app.use('/user', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

app.use(errorHandler);

connect('mongodb://localhost: 27017/mydb', {usedNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
});

document.getElementById('addUserForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const userNameInput = document.getElementById('userName');
    const userName = userNameInput.value;

    if(userName.trim() !== '') {
        const newUser = document.createElement('li');
        newUser.textContent = userName;

        const userList = document.getElementById('userList');
        userList.appendChild(newUser);

        userNameInput.value = '';
    } else {
        alert('Please enter a vaild username');
    }
});

