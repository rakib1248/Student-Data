const form = document.getElementById("student_form");
const ShowData = document.getElementById("all_studenData");
const msg = document.querySelector("#msg");
const ShowSingleStnd = document.querySelector(".student-single-Data");

// Show All STudentData
const allStudentDataList = () => {
  const form_Data = getDataLs("form_Data");
  let dataList = "";
  if (form_Data) {
    form_Data.forEach(function (item, index) {
      dataList += `
        <tr>
          <td>${index + 1}</td>
          <td>
            <img src="${item.photo}" alt="Photo of ${item.name}" />
          </td>
          <td>${item.name}</td>
          <td>${item.email}</td>
          <td>${item.phone}</td>
          <td>${item.location}</td>
          <td>${timeAgo(item.CreatedAt)}</td>
          <td>
            <button class="btn btn-sm btn-info" data-bs-toggle="modal"
            data-bs-target="#single-student-create" onclick="singleStudentData('${
              item.id
            }')" >
              <i class="fas fa-eye"></i>
            </button>
            <button class="btn btn-sm btn-warning">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-danger" onclick="DelateStudentData('${
              item.id
            }')">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      `;
    });
  } else {
    dataList = `
      <tr>
        <td colspan="8" class="text-center text-danger">No Data Found</td>
      </tr>
    `;
  }
  ShowData.innerHTML = dataList;
};
const singleStudentData = (id) => {
  const { name, email, phone, location, photo } = singleStudentDataFunction(
    "form_Data",
    id
  );
  ShowSingleStnd.innerHTML = `
              <img src="${photo}" alt="">
              <h1>${name}</h1>
              <p class="text-muted">${location}</p>
              <h5>${phone}</h5>
  `;
};
const DelateStudentData = (id) => {
  const conf = confirm("Apni Ki Sotti Apnar Data Dilate korte Can?");
  if (conf) {
    deleteStuden("form_Data", id);

    allStudentDataList();
  }
};

allStudentDataList();

// submit Data

form.onsubmit = (e) => {
  e.preventDefault();

  // form Data
  const form_Data = new FormData(e.target);

  const { name, email, phone, location, photo } = Object.fromEntries(
    form_Data.entries()
  );

  //   form Validation
  if (!name || !phone || !photo || !email || !location) {
    msg.innerHTML = creatAlert("All fields are Required");
  } else if (!isEmail(email)) {
    msg.innerHTML = creatAlert("InValit Email Address", "warning");
  } else if (!isMobail(phone)) {
    msg.innerHTML = creatAlert("InValit Mobaile Number", "warning");
  } else {
    msg.innerHTML = creatAlert("Student Data Created", "success");

    sendDataLs("form_Data", {
      name: name,
      id: CreatedId(),
      phone: phone,
      photo: photo,
      email: email,
      location: location,
      CreatedAt: Date.now(),
    });

    e.target.reset();
    allStudentDataList();
  }
};
