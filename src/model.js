var gCategoryLines = [];
var gFocusNode = undefined;


const resetLayout = () => {
    data = { "A": { "top": 100, "left": 634 }, "B": { "top": 100, "left": 1135 }, "label_A_B": { "top": 120, "left": 885 }, "C": { "top": 100, "left": 135 }, "label_C_A": { "top": 120, "left": 385 }, "D": { "top": 195, "left": 1135 }, "label_A_D": { "top": 215, "left": 885 } }

    for (elem in data) {
        var element = document.getElementById(elem);
        $(element).offset(data[elem]);
    }
    fixLine();
}

const setFocusNode = (name) => {
    if (gFocusNode) {
        if (gFocusNode.id == name) {
            // Clear selection
            gFocusNode.style.borderColor = 'oklch(var(--ac))';
            gFocusNode = undefined;
            return;
        } else {
            gFocusNode.style.borderColor = 'oklch(var(--ac))';
        }
    }

    gFocusNode = document.getElementById(name);
    gFocusNode.style.borderColor = 'oklch(var(--a))';
}

const buildTree = (nodes, lines) => {
    for (n in nodes) {
        var elem = document.getElementById(n);
        $(elem).offset(nodes[n]);
        if (elem.className === "category") {
            elem.style.visibility = 'hidden';
        }
    }

    for (l in lines) {
        var s = document.getElementById(lines[l].start);
        var e = document.getElementById(lines[l].end);
        var line = new LeaderLine(s, e,
            {
                endPlug: 'behind',
                color: 'oklch(var(--ac))',
                size: 2,
                path: "straight",
                endSocket: "top",
                hide: e.className === "category",
            },
        );

        if (e.className === "category") {
            gCategoryLines.push(line);
        }
    }
}

const nodeClicked = (elemId) => {
    var elem = document.getElementById(elemId);
    if (elem.style.borderColor === 'oklch(var(--a))') {
        alert('clicked ' + elem.id);
    } else {
        setFocusNode(elemId);
    }
}

const handleEvent = (event) => {
    if (!event.isTrusted) {
        return;
    }

    if (event.data.action == "collapse") {
        hideCategories();
    }

    if (event.data.action == "expand") {
        showCategories();
    }
}

const hideCategories = () => {
    for (elem of $(".category").get()) {
        elem.style.visibility = 'hidden';
    }

    for (line of gCategoryLines) {
        line.hide('none');
    }
}

const showCategories = () => {
    for (elem of $(".category").get()) {
        elem.style.visibility = 'visible';
    }

    for (line of gCategoryLines) {
        console.log(line);
        line.show('none');
    }
}

const handleClick = (e) => {
    console.log("handleClick", e);
    if (e.target.className === 'class' || e.target.className === 'category') {
        setFocusNode(e.target.id);
    }
}


const initialize = () => {
    console.log("Initializing model.js");
    var lines = [{ "start": "root", "end": "E" }, { "start": "E", "end": "F" }, { "start": "F", "end": "F1" }, { "start": "F", "end": "F2" }, { "start": "F", "end": "F3" }, { "start": "E", "end": "E2" }, { "start": "E", "end": "E3" }, { "start": "root", "end": "G" }, { "start": "G", "end": "H" }, { "start": "H", "end": "I" }, { "start": "I", "end": "I1" }, { "start": "I", "end": "I2" }, { "start": "I", "end": "I3" }, { "start": "H", "end": "H2" }, { "start": "H", "end": "H3" }, { "start": "G", "end": "J" }, { "start": "J", "end": "L" }, { "start": "L", "end": "L1" }, { "start": "L", "end": "L2" }, { "start": "L", "end": "L3" }, { "start": "J", "end": "J3" }, { "start": "G", "end": "M" }, { "start": "M", "end": "M1" }, { "start": "M", "end": "M2" }, { "start": "M", "end": "M3" }, { "start": "root", "end": "D3" }, { "start": "J", "end": "K" }, { "start": "K", "end": "K1" }, { "start": "K", "end": "K2" }, { "start": "K", "end": "K3" }]
    var nodes = { "root": { "top": 50.0, "left": 531.25 }, "E": { "top": 93.75, "left": 225.0 }, "F": { "top": 137.5, "left": 137.5 }, "F1": { "top": 181.25, "left": 50.0 }, "F2": { "top": 181.25, "left": 137.5 }, "F3": { "top": 181.25, "left": 225.0 }, "E2": { "top": 137.5, "left": 225.0 }, "E3": { "top": 137.5, "left": 312.5 }, "G": { "top": 93.75, "left": 750.0 }, "H": { "top": 137.5, "left": 400.0 }, "I": { "top": 181.25, "left": 312.5 }, "I1": { "top": 225.0, "left": 225.0 }, "I2": { "top": 225.0, "left": 312.5 }, "I3": { "top": 225.0, "left": 400.0 }, "H2": { "top": 181.25, "left": 400.0 }, "H3": { "top": 181.25, "left": 487.5 }, "J": { "top": 137.5, "left": 750.0 }, "K": { "top": 181.25, "left": 575.0 }, "K1": { "top": 225.0, "left": 487.5 }, "K2": { "top": 225.0, "left": 575.0 }, "K3": { "top": 225.0, "left": 662.5 }, "L": { "top": 181.25, "left": 837.5 }, "L1": { "top": 225.0, "left": 750.0 }, "L2": { "top": 225.0, "left": 837.5 }, "L3": { "top": 225.0, "left": 925.0 }, "J3": { "top": 181.25, "left": 925.0 }, "M": { "top": 137.5, "left": 1100.0 }, "M1": { "top": 181.25, "left": 1012.5 }, "M2": { "top": 181.25, "left": 1100.0 }, "M3": { "top": 181.25, "left": 1187.5 }, "D3": { "top": 93.75, "left": 837.5 } }

    buildTree(nodes, lines);
    console.log(lines);
}
