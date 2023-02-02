const mainContainer = document.querySelector("#mainContainer"),

// Parameters
qrInput = mainContainer.querySelector("#key"),
qrWidht = mainContainer.querySelector("#widhtSize"),
qrColor = mainContainer.querySelector("#GFG_Color"),
qrBackgroundColor = mainContainer.querySelector("#GFG_BackgroundColor"),
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
    let qr_Color = qrColor.value.trim().replace('#','');
    let qr_BackgroundColor = qrBackgroundColor.value.trim().replace('#','');
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

// https://api.qr-code-generator.com/v1/create?access-token=vc47oM-Yw_JtbpPCBPzMf3CF6xR1yrkWQWDjV6_ZTHE4KkVMMs8mEFlE9eGS1BCS&_lang=en&qr_code_id=46187238&image_format=PNG&image_width=500&background_color=%23ffffff&foreground_color=%23000000&frame_color=%23000000&frame_name=no-frame&account_frame_id=-1&frame_text=SCAN%20ME&frame_text_color=%23FFFFFF&frame_text_alignment=&frame_text_font=&frame_icon_name=&marker_left_template=version17&marker_left_inner_color=%23000000&marker_left_outer_color=%23000000&marker_right_template=version17&marker_right_inner_color=%23000000&marker_right_outer_color=%23000000&marker_bottom_template=version17&marker_bottom_inner_color=%23000000&marker_bottom_outer_color=%23000000&qr_code_logo=account23702282%2Flogo%2Fc83c5d93295296ef02b62289884a60f1.png&download=0&error_correction=&qr_code_pattern=rounded-2&rnd=1675223122785

downloadBtn.addEventListener('click', () => {
    let imgPath = qrImg.getAttribute('src');
    let fileName = getFileName(imgPath);

    saveAs(imgPath, fileName);
});

const getFileName = (string) => {
    return string.slice(string.lastIndexOf('&data=') + 6, string.lastIndexOf('&bgcolor='));
}