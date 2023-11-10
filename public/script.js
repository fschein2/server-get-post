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

        const h2 = document.createElement("h2");
        h2.innerHTML = soda.name;
        a.append(h2);

        a.onclick = (e) => {
            e.preventDefault();
            displayInfo(soda);
        };
    }));
};

const displayInfo = (soda) => {

};

window.onload = () => {
    showSodas();
};