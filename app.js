
// ========================================
// QUẢN LÝ KHÁCH HÀNG / THIẾT BỊ
// ========================================

let devices = [];
let currentDevice = null;


// ========================================
// LẤY ELEMENT
// ========================================

const listScreen =
    document.getElementById("listScreen");

const detailScreen =
    document.getElementById("detailScreen");

const addScreen =
    document.getElementById("addScreen");


const deviceList =
    document.getElementById("deviceList");

const deviceCount =
    document.getElementById("deviceCount");

const emptyMessage =
    document.getElementById("emptyMessage");


const searchInput =
    document.getElementById("searchInput");

const searchButton =
    document.getElementById("searchButton");

const typeFilter =
    document.getElementById("typeFilter");


const backButton =
    document.getElementById("backButton");


const addCustomerButton =
    document.getElementById("addCustomerButton");

const cancelAddButton =
    document.getElementById("cancelAddButton");

const cancelCustomerButton =
    document.getElementById("cancelCustomerButton");

const saveCustomerButton =
    document.getElementById("saveCustomerButton");


const copyAllButton =
    document.getElementById("copyAllButton");

const openWebButton =
    document.getElementById("openWebButton");

const deleteCustomerButton =
    document.getElementById(
        "deleteCustomerButton"
    );


const toast =
    document.getElementById("toast");


// ========================================
// LOAD DATA.JSON
// ========================================

async function loadData() {

    try {

        const response =
            await fetch("./data.json");

        if (!response.ok) {

            throw new Error(
                "Không đọc được data.json"
            );

        }


        const data =
            await response.json();


        if (!Array.isArray(data)) {

            throw new Error(
                "data.json không đúng định dạng"
            );

        }


        devices = data;


        console.log(
            "Đã tải dữ liệu:",
            devices
        );


        renderList(devices);

    }
    catch (error) {

        console.error(
            "Lỗi load data:",
            error
        );


        if (deviceList) {

            deviceList.innerHTML = "";

        }


        if (deviceCount) {

            deviceCount.textContent =
                "0 thiết bị";

        }


        if (emptyMessage) {

            emptyMessage.textContent =
                "Không thể tải dữ liệu.";

            emptyMessage.classList.remove(
                "hidden"
            );

        }

    }

}


// ========================================
// TÌM KIẾM
// ========================================

function searchDevices() {

    const keyword =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const selectedType =
        typeFilter
            ? typeFilter.value
            : "all";


    const result =
        devices.filter(
            function(device) {

                const searchText = [

                    device.name,
                    device.phone,
                    device.id,
                    device.web,
                    device.deviceId,
                    device.type,
                    device.qrCode,
                    device.note

                ]
                    .map(
                        function(value) {

                            return value || "";

                        }
                    )
                    .join(" ")
                    .toLowerCase();


                const keywordOK =
                    keyword === "" ||
                    searchText.includes(
                        keyword
                    );


                const typeOK =
                    selectedType === "all" ||
                    device.type ===
                        selectedType;


                return (
                    keywordOK &&
                    typeOK
                );

            }
        );


    renderList(result);

}


// ========================================
// NÚT TÌM KIẾM
// ========================================

if (searchButton) {

    searchButton.addEventListener(
        "click",
        function() {

            searchDevices();

        }
    );

}


// ========================================
// ENTER ĐỂ TÌM
// ========================================

if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                event.preventDefault();

                searchDevices();

            }

        }
    );

}


// ========================================
// LỌC WIFI / 4G
// ========================================

if (typeFilter) {

    typeFilter.addEventListener(
        "change",
        function() {

            searchDevices();

        }
    );

}


// ========================================
// HIỂN THỊ DANH SÁCH
// ========================================

function renderList(list) {

    if (!deviceList) {
        return;
    }


    deviceList.innerHTML = "";


    if (deviceCount) {

        deviceCount.textContent =
            list.length +
            " thiết bị";

    }


    if (list.length === 0) {

        if (emptyMessage) {

            emptyMessage.textContent =
                "Không tìm thấy thiết bị.";

            emptyMessage.classList.remove(
                "hidden"
            );

        }

        return;

    }


    if (emptyMessage) {

        emptyMessage.classList.add(
            "hidden"
        );

    }


    list.forEach(
        function(device) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "device-card";


            let typeClass =
                "type-wifi";


            if (
                String(device.type)
                    .toUpperCase() ===
                "4G"
            ) {

                typeClass =
                    "type-4g";

            }


            card.innerHTML = `

                <div class="device-card-main">

                    <div class="device-name">
                        ${safe(device.name)}
                    </div>

                    <div class="device-phone">
                        ${safe(device.phone)}
                    </div>

                    <div class="device-id">
                        ${safe(device.id)}
                    </div>

                    <div class="device-device-id">
                        ${safe(device.deviceId)}
                    </div>

                    <div>
                        <span class="type-badge ${typeClass}">
                            ${safe(device.type)}
                        </span>
                    </div>

                </div>

            `;


            card.addEventListener(
                "click",
                function() {

                    showDetail(device);

                }
            );


            deviceList.appendChild(
                card
            );

        }
    );

}


// ========================================
// HIỂN THỊ CHI TIẾT
// ========================================

function showDetail(device) {

    currentDevice =
        device;


    if (listScreen) {

        listScreen.classList.add(
            "hidden"
        );

    }


    if (addScreen) {

        addScreen.classList.add(
            "hidden"
        );

    }


    if (detailScreen) {

        detailScreen.classList.remove(
            "hidden"
        );

    }


    setValue(
        "detailName",
        device.name
    );

    setValue(
        "detailPhone",
        device.phone
    );

    setValue(
        "detailId",
        device.id
    );

    setValue(
        "detailWeb",
        device.web
    );

    setValue(
        "detailDeviceId",
        device.deviceId
    );

    setValue(
        "detailType",
        device.type
    );

    setValue(
        "detailQrCode",
        device.qrCode
    );

    setValue(
        "detailNote",
        device.note
    );


    const detailTitle =
        document.getElementById(
            "detailTitle"
        );


    if (detailTitle) {

        detailTitle.textContent =
            device.name || "";

    }


    createQR(
        device.qrCode ||
        device.web ||
        device.id ||
        ""
    );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ========================================
// QUAY LẠI TỪ CHI TIẾT
// ========================================

if (backButton) {

    backButton.addEventListener(
        "click",
        function() {

            if (detailScreen) {

                detailScreen.classList.add(
                    "hidden"
                );

            }


            if (listScreen) {

                listScreen.classList.remove(
                    "hidden"
                );

            }


            currentDevice =
                null;


            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


// ========================================
// TẠO QR
// ========================================

function createQR(text) {

    const qr =
        document.getElementById(
            "qrCode"
        );


    if (!qr) {
        return;
    }


    qr.innerHTML = "";


    if (!text) {

        qr.textContent =
            "Không có mã QR";

        return;

    }


    if (
        typeof QRCode ===
        "undefined"
    ) {

        qr.textContent =
            "Không tải được thư viện QR";

        return;

    }


    new QRCode(
        qr,
        {
            text: String(text),

            width: 160,

            height: 160,

            correctLevel:
                QRCode.CorrectLevel.H
        }
    );

}


// ========================================
// COPY TỪNG TRƯỜNG
// ========================================

const copyButtons =
    document.querySelectorAll(
        ".copy-button"
    );


copyButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            async function(event) {

                event.preventDefault();

                event.stopPropagation();


                const targetId =
                    button.getAttribute(
                        "data-copy"
                    );


                const target =
                    document.getElementById(
                        targetId
                    );


                if (!target) {

                    console.error(
                        "Không tìm thấy:",
                        targetId
                    );

                    return;

                }


                const text =
                    target.value || "";


                await copyText(
                    text
                );


                showToast(
                    "✓ Đã copy"
                );

            }
        );

    }
);


// ========================================
// COPY TẤT CẢ
// ========================================

if (copyAllButton) {

    copyAllButton.addEventListener(
        "click",
        async function() {

            if (!currentDevice) {
                return;
            }


            const text =
`Tên: ${currentDevice.name || ""}

Số điện thoại: ${currentDevice.phone || ""}

ID: ${currentDevice.id || ""}

Địa chỉ web: ${currentDevice.web || ""}

ID Device: ${currentDevice.deviceId || ""}

Loại: ${currentDevice.type || ""}

Mã QR: ${currentDevice.qrCode || ""}

Ghi chú: ${currentDevice.note || ""}`;


            await copyText(
                text
            );


            showToast(
                "✓ Đã copy tất cả"
            );

        }
    );

}


// ========================================
// MỞ WEB
// ========================================

if (openWebButton) {

    openWebButton.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            event.stopPropagation();


            if (!currentDevice) {
                return;
            }


            let url =
                currentDevice.web;


            if (!url) {

                showToast(
                    "Không có địa chỉ web"
                );

                return;

            }


            url =
                String(url).trim();


            if (
                !url.startsWith(
                    "http://"
                ) &&
                !url.startsWith(
                    "https://"
                )
            ) {

                url =
                    "https://" +
                    url;

            }


            window.open(
                url,
                "_blank"
            );

        }
    );

}


// ========================================
// MỞ FORM THÊM KHÁCH HÀNG
// ========================================

if (addCustomerButton) {

    addCustomerButton.addEventListener(
        "click",
        function() {

            if (listScreen) {

                listScreen.classList.add(
                    "hidden"
                );

            }


            if (detailScreen) {

                detailScreen.classList.add(
                    "hidden"
                );

            }


            if (addScreen) {

                addScreen.classList.remove(
                    "hidden"
                );

            }


            clearAddForm();


            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


// ========================================
// XÓA FORM THÊM
// ========================================

function clearAddForm() {

    setValue(
        "addName",
        ""
    );

    setValue(
        "addPhone",
        ""
    );

    setValue(
        "addId",
        ""
    );

    setValue(
        "addWeb",
        ""
    );

    setValue(
        "addDeviceId",
        ""
    );

    setValue(
        "addQrCode",
        ""
    );

    setValue(
        "addNote",
        "");


    const type =
        document.getElementById(
            "addType"
        );


    if (type) {

        type.value =
            "WiFi";

    }

}


// ========================================
// ĐÓNG FORM THÊM
// ========================================

function closeAddScreen() {

    if (addScreen) {

        addScreen.classList.add(
            "hidden"
        );

    }


    if (detailScreen) {

        detailScreen.classList.add(
            "hidden"
        );

    }


    if (listScreen) {

        listScreen.classList.remove(
            "hidden"
        );

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


if (cancelAddButton) {

    cancelAddButton.addEventListener(
        "click",
        closeAddScreen
    );

}


if (cancelCustomerButton) {

    cancelCustomerButton.addEventListener(
        "click",
        closeAddScreen
    );

}


// ========================================
// LƯU KHÁCH HÀNG
// ========================================

if (saveCustomerButton) {

    saveCustomerButton.addEventListener(
        "click",
        function() {

            const newCustomer = {

                name:
                    getValue(
                        "addName"
                    ),

                phone:
                    getValue(
                        "addPhone"
                    ),

                id:
                    getValue(
                        "addId"
                    ),

                web:
                    getValue(
                        "addWeb"
                    ),

                deviceId:
                    getValue(
                        "addDeviceId"
                    ),

                type:
                    getValue(
                        "addType"
                    ),

                qrCode:
                    getValue(
                        "addQrCode"
                    ),

                note:
                    getValue(
                        "addNote"
                    )

            };


            // ----------------------------
            // KIỂM TRA DỮ LIỆU
            // ----------------------------

            if (!newCustomer.name) {

                showToast(
                    "Vui lòng nhập tên"
                );

                focusInput(
                    "addName"
                );

                return;

            }


            if (!newCustomer.id) {

                showToast(
                    "Vui lòng nhập ID"
                );

                focusInput(
                    "addId"
                );

                return;

            }


            if (!newCustomer.deviceId) {

                showToast(
                    "Vui lòng nhập ID Device"
                );

                focusInput(
                    "addDeviceId"
                );

                return;

            }


            // ----------------------------
            // KIỂM TRA ID TRÙNG
            // ----------------------------

            const idExists =
                devices.some(
                    function(device) {

                        return (
                            String(
                                device.id || ""
                            )
                            .toLowerCase()
                            ===
                            newCustomer.id
                                .toLowerCase()
                        );

                    }
                );


            if (idExists) {

                showToast(
                    "ID khách hàng đã tồn tại"
                );

                focusInput(
                    "addId"
                );

                return;

            }


            // ----------------------------
            // KIỂM TRA DEVICE ID TRÙNG
            // ----------------------------

            const deviceExists =
                devices.some(
                    function(device) {

                        return (
                            String(
                                device.deviceId ||
                                ""
                            )
                            .toLowerCase()
                            ===
                            newCustomer.deviceId
                                .toLowerCase()
                        );

                    }
                );


            if (deviceExists) {

                showToast(
                    "ID Device đã tồn tại"
                );

                focusInput(
                    "addDeviceId"
                );

                return;

            }


            // ----------------------------
            // QR MẶC ĐỊNH = ID
            // ----------------------------

            if (!newCustomer.qrCode) {

                newCustomer.qrCode =
                    newCustomer.id;

            }


            // ----------------------------
            // THÊM KHÁCH HÀNG
            // ----------------------------

            devices.push(
                newCustomer
            );


            // ----------------------------
            // ĐÓNG FORM
            // ----------------------------

            if (addScreen) {

                addScreen.classList.add(
                    "hidden"
                );

            }


            if (listScreen) {

                listScreen.classList.remove(
                    "hidden"
                );

            }


            // ----------------------------
            // RESET TÌM KIẾM
            // ----------------------------

            if (searchInput) {

                searchInput.value =
                    "";

            }


            if (typeFilter) {

                typeFilter.value =
                    "all";

            }


            // ----------------------------
            // HIỂN THỊ LẠI
            // ----------------------------

            renderList(
                devices
            );


            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });


            showToast(
                "✓ Đã thêm khách hàng"
            );

        }
    );

}


// ========================================
// XÓA KHÁCH HÀNG
// ========================================

if (deleteCustomerButton) {

    deleteCustomerButton.addEventListener(
        "click",
        function() {

            if (!currentDevice) {

                showToast(
                    "Chưa chọn khách hàng"
                );

                return;

            }


            const customerName =
                currentDevice.name ||
                currentDevice.id ||
                "khách hàng";


            const confirmed =
                confirm(
                    `Bạn có chắc muốn xóa "${customerName}" không?\n\nDữ liệu sẽ bị xóa khỏi danh sách hiện tại.`
                );


            if (!confirmed) {

                return;

            }


            // Tìm vị trí trong mảng
            const index =
                devices.indexOf(
                    currentDevice
                );


            if (index === -1) {

                showToast(
                    "Không tìm thấy khách hàng"
                );

                return;

            }


            // Xóa
            devices.splice(
                index,
                1
            );


            // Xóa biến hiện tại
            currentDevice =
                null;


            // Đóng màn hình chi tiết
            if (detailScreen) {

                detailScreen.classList.add(
                    "hidden"
                );

            }


            // Quay về danh sách
            if (listScreen) {

                listScreen.classList.remove(
                    "hidden"
                );

            }


            // Hiển thị lại
            searchDevices();


            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });


            showToast(
                "✓ Đã xóa khách hàng"
            );

        }
    );

}


// ========================================
// COPY TEXT
// ========================================

async function copyText(text) {

    text =
        String(text || "");


    try {

        await navigator.clipboard.writeText(
            text
        );

    }
    catch (error) {

        const textarea =
            document.createElement(
                "textarea"
            );


        textarea.value =
            text;


        textarea.style.position =
            "fixed";

        textarea.style.left =
            "-9999px";


        document.body.appendChild(
            textarea
        );


        textarea.focus();

        textarea.select();


        try {

            document.execCommand(
                "copy"
            );

        }
        catch (e) {

            console.error(
                "Copy thất bại:",
                e
            );

        }


        textarea.remove();

    }

}


// ========================================
// TOAST
// ========================================

let toastTimer =
    null;


function showToast(message) {

    if (!toast) {
        return;
    }


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            function() {

                toast.classList.remove(
                    "show"
                );

            },
            1500
        );

}


// ========================================
// GET VALUE
// ========================================

function getValue(id) {

    const element =
        document.getElementById(
            id
        );


    if (!element) {
        return "";
    }


    return String(
        element.value || ""
    ).trim();

}


// ========================================
// SET VALUE
// ========================================

function setValue(
    id,
    value
) {

    const element =
        document.getElementById(
            id
        );


    if (element) {

        element.value =
            value || "";

    }

}


// ========================================
// FOCUS INPUT
// ========================================

function focusInput(id) {

    const element =
        document.getElementById(
            id
        );


    if (element) {

        element.focus();

    }

}


// ========================================
// CHỐNG HTML INJECTION
// ========================================

function safe(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}


// ========================================
// KHỞI ĐỘNG
// ========================================

loadData();

