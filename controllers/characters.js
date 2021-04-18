const Character = require('../models/character');

exports.index = async(request, responce, next) => {
    try {
        const characters = await Character.find();
        responce.status(200).json(characters);
    } catch (error) {
        next(error);
    }
};

exports.create = async(request, responce, next) => {
    try {
        const {
            characterName,
            characterClass,
            level,
            race,
            alignment,
            background,
            str,
            dex,
            con,
            int,
            wis,
            cha
        } = request.body;

        const character = await Character.create({
            characterName,
            characterClass,
            level,
            race,
            alignment,
            background,
            str,
            dex,
            con,
            int,
            wis,
            cha
        });

        responce.status(200).json({
            message: "Character was successfully created.",
            status: "success",
            character
        });
    } catch (error) {
        next(error);
    }
};

exports.show = async(request, responce, next) => {
    try{
        const { id } = request.params;

        const character = await Character.findById(id).populate('Class');
        const characterClass = await character.getClass();

        responce.status(200).json({ ...character._doc, characterClass});
    } catch(error) {
        next(error);
    }
};

exports.update = async(request, responce, next) => {
    try {
        const { 
            id,
            characterName,
            characterClass,
            level,
            race,
            alignment,
            background,
            str,
            dex,
            con,
            int,
            wis,
            cha } = request.body;

        await Character.findOneAndUpdate({ _id: id }, { 
            characterName,
            characterClass,
            level,
            race,
            alignment,
            background,
            str,
            dex,
            con,
            int,
            wis,
            cha });
        const character = await Character.findById(id);

        responce.status(200).json({
            message: "Character was updated successfully",
            status: "success",
            character
        });
    } catch(error) {
        next(error);
    }
};

exports.destroy = async(request, responce, next) => {
    try {
        const { id } = request.body;
     
        await Character.findOneAndDelete({ _id: id });
     
        responce.status(200).json({
            message: "Character was deleted successfully",
            status: "success"
        });
    } catch (error) {
        next(error);
    }
};