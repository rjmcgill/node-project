const Class = require('../models/class');

exports.index = async(request, responce, next) => {
    try {
        const classes = await Class.find();
        responce.status(200).json(classes);
    } catch (error) {
        next(error);
    }
};

exports.create = async(request, responce, next) => {
    try {
        const {
            className,
            spellcaster,
            mainAbilities
        } = request.body;

        const characterClass = await Class.create({
            className,
            spellcaster,
            mainAbilities
        });

        responce.status(200).json({
            message: "Class was successfully created.",
            status: "success",
            characterClass
        });
    } catch (error) {
        next(error);
    }
};

exports.show = async(request, responce, next) => {
    try{
        const { id } = request.params;

        const characterClass = await Class.findById(id);


        responce.status(200).json(characterClass);
    } catch(error) {
        next(error);
    }
};

exports.update = async(request, responce, next) => {
    try {
        const { 
            id, 
            className, 
            spellcaster, 
            mainAbilities } = request.body;

        await Class.findOneAndUpdate({ _id: id }, { 
            className, 
            spellcaster, 
            mainAbilities });
        const characterClass = await Class.findById(id);

        responce.status(200).json({
            message: "Class was updated successfully",
            status: "success",
            characterClass
        });
    } catch(error) {
        next(error);
    }
};

exports.destroy = async(request, responce, next) => {
    try {
        const { id } = request.body;
     
        await Class.findOneAndDelete({ _id: id });
     
        responce.status(200).json({
            message: "Class was deleted successfully",
            status: "success"
        });
    } catch (error) {
        next(error);
    }
};