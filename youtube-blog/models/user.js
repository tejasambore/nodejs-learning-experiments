const { createHmac, randomBytes } = require('crypto');
const { Schema, model } = require('mongoose');
// const avatar = require('../public/images/avatar');
const {avatarUrl} = 'https://res.cloudinary.com/dz1qj3x2h/image/upload/v1698856260/avatar.png';

const userSchema = new Schema ({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    salt: { type: String,  },
    password: { type: String, required: true},
    profileImgUrl: { type: String, default: avatarUrl },
    role: { type: String, enum: ['user', 'admin'], default: 'user'},
}, { timestamps: true });

userSchema.pre('save', function (next) {
    const user = this;

    if (!user.isModified('password')) return;

    const salt = randomBytes(16).toString();
    // const salt = "SaySomething";
    const hashedPassword = createHmac('sha256', salt)
        .update(user.password)
        .digest('hex');

        this.salt = salt;
        this.password = hashedPassword;

        next();
});
 
userSchema.static("matchPassword", async function (email, password) {
    const user = await this.findOne({ email });
    if ( !user ) throw new Error('User not found!');

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac("sha256", salt)
        .update(password)
        .digest('hex');

        if (hashedPassword != userProvidedHash) {
            throw new Error('Invalid Password!');
        }

        // return {...user, password: undefined, salt: undefined };
        return user;
})

const User = model('user', userSchema);

module.exports = User;