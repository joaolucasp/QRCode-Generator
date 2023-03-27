const mainContainer = document.querySelector("#mainContainer"),

// Parameters
qrInput = mainContainer.querySelector("#key"),
qrWidht = mainContainer.querySelector("#widhtSize"),
qrColor = mainContainer.querySelector("#color"),
qrColorPicker = mainContainer.querySelector("#GFG_Color"),
qrBackgroundColor = mainContainer.querySelector("#backgroundColor"),
qrBackgroundColorPicker = mainContainer.querySelector("#GFG_BackgroundColor"),
qrFormat = mainContainer.querySelector("#format"),

// Buttons
generateBtn = mainContainer.querySelector(".form button"),
textGenerateBtn = generateBtn.querySelector("span"),
downloadBtn = mainContainer.querySelector(".qr-code-result button");

// QR Image
qrImg = mainContainer.querySelector(".qr-code-result img");

let preValue;

generateBtn.addEventListener("click", () => {
    let qrValue = qrInput.value.trim();
    let qrSize = qrWidht.value.trim() ? qrWidht.value.trim() : 200;
    let qr_Color = qrColorPicker.value.trim().replace('#','');
    let qr_BackgroundColor = qrBackgroundColorPicker.value.trim().replace('#','');
    let qr_Format = qrFormat.value.trim();

    if (!qrValue || preValue === qrValue) {
        alert("Please enter a valid value!");
        return;
    };

    preValue = qrValue;
    textGenerateBtn.innerText = "Gerando QR Code...";
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${qrValue}&bgcolor=${qr_BackgroundColor}&color=${qr_Color}&margin=5&format=${qr_Format}`;

    qrImg.addEventListener("load", () => {
        mainContainer.classList.add("active");
        textGenerateBtn.textContent = "Gerar QR Code";
    });
});

qrInput.addEventListener("keyup", () => {
    if (!qrInput.value.trim()) {
        mainContainer.classList.remove("active");
        preValue = "";
    }
});

function changeColorPicker(input, color) {
    document.getElementById(input).value = color;
}

downloadBtn.addEventListener('click', () => {
    let imgPath = qrImg.getAttribute('src');
    let fileName = getFileName(imgPath);

    saveAs(imgPath, fileName);
});

const getFileName = (string) => {
    return string.slice(string.lastIndexOf('&data=') + 6, string.lastIndexOf('&bgcolor='));
}