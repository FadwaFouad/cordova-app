
$("document").ready(
    function () {
        const conName = $('#con-name')[0];
        const phone = $('#phone')[0];
        const saveBtn = $('#save-btn');
        const editBtn = $('#edit-btn');
        const newName = $('#new-name')[0];
        const newPhone = $('#new-phone')[0];
        const alertMsg = $('#alert-msg')[0];
        var clickedRow = 0;
        var generateID=0;


        const contacts = [];


        saveBtn.on('click', function () {
            // remove alert msg
            if (conName.value == "") {
                alert("name is empty")
            } else if (phone.value == "") {
                alert("enter correct phone number")
            } else {
                let contact = {
                    id: generateID++,
                    conName: conName.value,
                    phone: phone.value
                }

                contacts.push(contact)
                console.log(contacts)
                addContact(contact)
                conName.value = ""
                phone.value = ""
                alertMsg.style.display = "block"
                hideAlert()
                $("#editContactModal").modal('hide');
            }
        })

        const addContact = (contact) => {
            var newRow = $('<tr  data-bs-toggle="modal" data-bs-target="#editContactModal">')
            var nameCell = $('<td>').text(contact.conName);
            var emailCell = $('<td>').text(contact.phone);
            newRow.append(nameCell);
            newRow.append(emailCell);
            $('table').append(newRow);
        }

        $('table').on('click', 'tr', function () {
            // Retrieve the name and phone values from the clicked row
            var name = $(this).find('td:eq(0)').text();
            var phone = $(this).find('td:eq(1)').text();
            // init variables for edit
            newName.value = name;
            newPhone.value = phone;
            clickedRow = $(this).index();
        });


        $('#remove-btn').on('click', function () {
            removeContact(clickedRow);
            loadContacts()
            console.log(contacts)
            $("#editContactModal").modal('hide');

        });


        editBtn.on('click', function () {
            if (newName.value == "") {
                alert("name is empty")
            } else if (newPhone.value == "") {
                alert("enter correct phone number")
            } else {
                editContact(clickedRow);
                loadContacts()
                console.log(contacts)

                newName.value = ""
                newPhone.value = ""
                alertMsg.style.display = "block"
                hideAlert();
                $("#editContactModal").modal('hide');

            }
        })



        const removeContact = (index) => {
            contacts.splice(index, 1)
        }





        const editContact = (index) => {
            console.log(contacts)
            contacts[index].conName = newName.value
            contacts[index].phone = newPhone.value
            console.log(contacts)
        }

        const hideAlert = () => {
            setTimeout(() => {
                alertMsg.style.display = "none"
            }, 1500)
        }

        const loadContacts = () => {

            var table = $('#table');
            var rows = table.find('tr:not(:first)');
            rows.remove();
            contacts.forEach((contact) => {
                addContact(contact)
            })
        }
    });