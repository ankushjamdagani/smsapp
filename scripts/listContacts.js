var contacts = 
    [
        {
            firstName: 'Ankush',
            lastName: 'Jamdagani',
            contact: '9466462396',
            countryCode: '+91'
        },
        {
            firstName: 'Ankush',
            lastName: 'Jamdagani',
            contact: '9466462396',
            countryCode: '+91'
        },
        {
            firstName: 'Ankush',
            lastName: 'Jamdagani',
            contact: '9466462396',
            countryCode: '+91'
        },
        {
            firstName: 'Ankush',
            lastName: 'Jamdagani',
            contact: '9466462396',
            countryCode: '+91'
        },
        {
            firstName: 'Ankush',
            lastName: 'Jamdagani',
            contact: '9466462396',
            countryCode: '+91'
        },
    ];

    var messages = 
    [
        {
            contact: '9466462396',
            countryCode: '+91',
            message: 'This is some demo text'
        },
    ];

    $(document).ready(function () {
        var Contacts = (function () {
            return {
                tabMainBLock : function () {
                    $('#ctrls-wrapper div').on('click', function () {
                        $('#ctrls-wrapper div.active').removeClass('active');
                        $('.main-block.active').removeClass('active');

                        var toShow = $(this).data('show');

                        $(this).addClass('active');
                        $('#' + toShow).addClass('active');
                    });
                },

                listContacts : function () {
                    contacts.forEach(function(contact) {
                        $('#list-contacts').append(`<li>` + contact.firstName + ` ` + contact.lastName + `</li>`);
                    });
                },
                
                listMessage : function () {
                    messages.forEach(function(message) {
                        $('#list-message').append(`<li>` + message.firstName + ` ` + message.lastName + `</li>`);
                    });
                },

                viewContact : function () {
                    $('.visible-contact > div:first-child').on('click', function () {
                        $(this).closest('li').toggleClass('active');
                    });
                },
                
            }
        })();

        // Contacts.listContacts();
        Contacts.tabMainBLock();
        Contacts.listMessage();
        Contacts.viewContact();
    });