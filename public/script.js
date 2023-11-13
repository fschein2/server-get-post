const getSodas = async() => {
    try {
        return (await fetch("api/sodas")).json();
    } catch (error) {
        console.log(error);
    }
};

const showSodas = async() => {
    let sodas = await getSodas();
    let sodaDiv = document.getElementById("soda-div");
    sodaDiv.innerHTML = "";
    sodas.forEach((soda => {
        const section = document.createElement("section");
        sodaDiv.append(section);

        const a = document.createElement("a");
        a.href= "#";
        section.append(a);

        const h3 = document.createElement("h3");
        h3.innerHTML = soda.name;
        a.append(h3);

        a.onclick = (e) => {
            e.preventDefault();
            displayInfo(soda);
        };
    }));
};

const displayInfo = (soda) => {
    const sodaInfo = document.getElementById("soda-info");
    sodaInfo.innerHTML = "";

    const h3 = document.createElement("h3");
    h3.innerHTML = soda.name;
    sodaInfo.append(h3);

    const p = document.createElement("p");
    p.innerHTML = `Total Calories: ${soda.calories}`;
    sodaInfo.append(p);

    const p1 = document.createElement("p");
    p1.innerHTML = `Sugar Content: ${soda.sugar}g`;
    sodaInfo.append(p1);

    const p2 = document.createElement("p");
    p2.innerHTML = `Ounces per Can: ${soda.oz}oz`;
    sodaInfo.append(p2);

    const h4 = document.createElement("h4");
    h4.innerHTML = `Types of ${soda.name}`;
    sodaInfo.append(h4);

    const ul = document.createElement("ul");
    sodaInfo.append(ul);
    soda.subTypes.forEach((type) => {
        const li = document.createElement("li");
        li.innerHTML = type;
        ul.append(li);
    });
};

const addSoda = async(e) => {
    e.preventDefault();
    const form = document.getElementById("add-soda-form");
    const formData = new FormData(form);
    let response;

    if (form._id.value == -1) {
        formData.delete("_id");
        formData.append("subTypes", getTypes());

        console.log(...formData);

        response = await fetch("/api/sodas", {
            method: "POST",
            body: formData
        });
    }

    if (response.status != 200) {
        const errorMessage = setInterval( () => {
            let i = 0;
            const resultDiv = document.getElementById("result");
            resultDiv.innerHTML = "Failed to post soda";
            i++;
            if (i > 3) {
                clearInterval(errorMessage);
            }

        }, 1000);
    }

    if (response.status = 200) {
        const successMessage = setInterval( () => {
            let i = 0;
            const resultDiv = document.getElementById("result");
            resultDiv.innerHTML = "Successfully posted soda";
            i++;
            if (i > 3) {
                clearInterval(successMessage);
            }

        }, 1000);
    }

    response = await response.json();
    resetFrom();
    document.querySelector(".dialog").classList.add("transparent");
    showSodas();
};

const getTypes = () => {
    const inputs = document.querySelectorAll("type-boxes input");
    let types = [];

    inputs.forEach((input) => {
        types.push(input.value);
    });

    return types;
}

const resetForm = () => {
    const form = document.getElementById("add-soda-form");
    form.reset();
    form._id = "-1";
    document.getElementById("type-boxes").innerHTML = "";
};

const showHideAdd = (e) => {
    e.preventDefault();
    document.querySelector(".dialog").classList.remove("transparent");
    document.getElementById("add-title").innerHTML = "Add Soda";
    resetForm();
};

const addType = (e) => {
    e.preventDefault();
    const section = document.getElementById("type-boxes");
    const input = document.createElement("input");
    input.type = "text";
    section.append(input);
}

window.onload = () => {
    showSodas();
    document.getElementById("add-soda-form").onsubmit = addSoda;
    document.getElementById("add-link").onclick = showHideAdd;

    document.querySelector(".close").onclick = () => {
        document.querySelector(".dialog").classList.add("transparent");
    };

    document.getElementById("add-type").onclick = addType;
};