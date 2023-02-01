const mainContainer = document.querySelector("#mainContainer"),
qrInput = mainContainer.querySelector("#key"),

// Buttons
generateBtn = mainContainer.querySelector(".form button"),
downloadBtn = mainContainer.querySelector(".qr-code-result button");

// QR Image
qrImg = mainContainer.querySelector(".qr-code-result img");

let preValue;

generateBtn.addEventListener("click", () => {
    let qrValue = qrInput.value.trim();

    if(!qrValue || preValue === qrValue) {
        alert("Please enter a valid value!");
        return;
    };

    preValue = qrValue;
    generateBtn.innerText = "Gerando QR Code...";
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
    qrImg.addEventListener("load", () => {
        mainContainer.classList.add("active");
        generateBtn.innerText = "Gerar QR Code";
    });
});

qrInput.addEventListener("keyup", () => {
    if(!qrInput.value.trim()) {
        mainContainer.classList.remove("active");
        preValue = "";
    }
});

downloadBtn.addEventListener('click', () => {
    let imgPath = qrImg.getAttribute('src');
    let fileName = getFileName(imgPath);
    

    saveAs(imgPath, fileName);
});

const getFileName = (string) => {
    return string.substring(string.lastIndexOf('&data=') + 6);
}