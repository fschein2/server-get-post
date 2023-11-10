const express = require("express");
const app = express();
const Joi = require("joi");
const multer = require("multer");
app.use(express.static("public"));
app.use(express.json());
const cors = require("cors");
app.use(cors());

const upload = multer({ dest: __dirname + "/public/images"});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

let sodas = [{
        _id: 1,
        name: "Pepsi",
        sugar: "41",
        calories: "150",
        oz: "12",
        subBrands: [
            "Diet Pepsi",
            "Pepsi Zero",
            "Pepsi Cherry"
        ],
    },
    {
        _id: 2,
        name: "Mountain Dew",
        sugar: "46",
        calories: "170",
        oz: "12",
        subBrands: [
            "Diet Mtn Dew",
            "Mtn Dew Baja Blast",
            "Mtn Dew Code Red",
            "Mtn Dew Pitch Black"
        ],
    },
    {
        _id: 3,
        name: "Coca-Cola",
        sugar: "39",
        calories: "140",
        oz: "12",
        subBrands: [
            "Diet Coke",
            "Coke Zero",
            "Vanilla Coke"
        ],
    },
    {   
        _id: 4,
        name: "Dr Pepper",
        sugar: "39",
        calories: "150",
        oz: "12",
        subBrands: [
            "Diet Dr Pepper",
            "Dr Pepper & Cream Soda",
            "Dr Pepper Strawberries and Cream",
            "Dr Pepper Cherry"
        ],
    },
    {
        _id: 5,
        name: "A&W Root Beer",
        sugar: "45",
        calories: "170",
        oz: "120",
        subBrands: [
            "Diet A&W Root Beer",
            "A&W Cream Soda",
            "Diet A&W Cream Soda"
        ],
    },
    {
        _id: 6,
        name: "Sprite",
        sugar: "51",
        calories: "190",
        oz: "12",
        subBrands: [
            "Sprite Zero",
            "Sprite Cranberry"
        ],
    }
];

app.get("/api/sodas", (req, res) => {
    res.send(sodas);
});

app.post("/api/sodas", (req, res) => {
    const result = validateSoda(req.body);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const soda = {
        _id: sodas.length + 1,
        name: req.body.name,
        sugar: req.body.sugar,
        calories: req.body.calories,
        oz: req.body.oz,
        subBrands: req.body.subBrands.split(",")
    }

    sodas.push(soda);
    res.send(sodas);
});

const validateSoda = (soda) => {
    const schema = Joi.object({
        _id: Joi.allow(""),
        name: Joi.string().min(3).required(),
        sugar: Joi.string().required(),
        calories: Joi.string().required(),
        oz: Joi.string().required(),
        subBrands: Joi.allow("")
    });

    return schema.validate(soda);
};

app.listen(3000, () => {
    console.log("listening");
});