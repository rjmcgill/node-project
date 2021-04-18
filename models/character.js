const mongoose = require('mongoose');
const Class = require('../models/class');

const CharacterSchema = new mongoose.Schema({
    //Character Basics
    characterName: {
        type: String,
        required: true
    },
    characterClass: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        validate: [
            {
                validator: async function(value) {
                    return Class.findById(value);
                },
                message: `Given class does not exist. Please choose an existing class.`
            }
        ]
    },
    level: {
        type: Number,
        required: true,
        validate: [
            {
                validator: async function(value) {
                    if(value > 1 || value < 20) {
                        return true;
                    }
                },
                message: props => `${props.value} is out of bounds. Please choose a number from 1-20.`
            }
        ]
    },
    race: {
        type: String,
        required: true
    },
    alignment: {
        type: String
    },
    background: {
        type: String,
        required: true
    },
    //Ability scores
    str: {
        type: Number,
        required: true,
        validate: [
            {
                validator: async function(value) {
                    abilityValidator(value);
                },
                message: props => `${props.value} is out of bounds. Please choose a number from 1-20.`
            }
        ]
    },
    dex: {
        type: Number,
        required: true,
        validate: [
            {
                validator: async function(value) {
                    abilityValidator(value);
                },
                message: props => `${props.value} is out of bounds. Please choose a number from 1-20.`
            }
        ]
    },
    con: {
        type: Number,
        required: true,
        validate: [
            {
                validator: async function(value) {
                    abilityValidator(value);
                },
                message: props => `${props.value} is out of bounds. Please choose a number from 1-20.`
            }
        ]
    },
    int: {
        type: Number,
        required: true,
        validate: [
            {
                validator: async function(value) {
                    abilityValidator(value);
                },
                message: props => `${props.value} is out of bounds. Please choose a number from 1-20.`
            }
        ]
    },
    wis: {
        type: Number,
        required: true,
        validate: [
            {
                validator: async function(value) {
                    abilityValidator(value);
                },
                message: props => `${props.value} is out of bounds. Please choose a number from 1-20.`
            }
        ]
    },
    cha: {
        type: Number,
        required: true,
        validate: [
            {
                validator: async function(value) {
                    abilityValidator(value);
                },
                message: props => `${props.value} is out of bounds. Please choose a number from 1-20.`
            }
        ]
    }
});

const abilityValidator = value => {
    if(value < 1) {
        return false;
    }
    return true;
};

CharacterSchema.methods.getClass = async function() {
    return await mongoose.model('Class').find({
        _id: this.characterClass
    });
}

module.exports = mongoose.model('Character', CharacterSchema);