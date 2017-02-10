// var contactsss = 
//     [
//         {
//             firstName: 'Ankush',
//             lastName: 'Jamdagani',
//             phone: '9466462396',
//             countryCode: '+91'
//         },
//         {
//             firstName: 'Hemant',
//             lastName: 'Yadav',
//             phone: '9671162385',
//             countryCode: '+91'
//         },
//         {
//             firstName: 'Rahul',
//             lastName: 'Verma',
//             phone: '7206016012',
//             countryCode: '+91'
//         },
//         {
//             firstName: 'Naveen',
//             lastName: 'Jamdagani',
//             phone: '7027024333',
//             countryCode: '+91'
//         },
//         {
//             firstName: 'Ankush',
//             lastName: 'Jamdagani',
//             phone: '9466462396',
//             countryCode: '+91'
//         },
//         {
//             firstName: 'Hemant',
//             lastName: 'Yadav',
//             phone: '9671162385',
//             countryCode: '+91'
//         },
//         {
//             firstName: 'Rahul',
//             lastName: 'Verma',
//             phone: '7206016012',
//             countryCode: '+91'
//         },
//         {
//             firstName: 'Naveen',
//             lastName: 'Jamdagani',
//             phone: '7027024333',
//             countryCode: '+91'
//         },{
//             firstName: 'Ankush',
//             lastName: 'Jamdagani',
//             phone: '9466462396',
//             countryCode: '+91'
//         },
//         {
//             firstName: 'Hemant',
//             lastName: 'Yadav',
//             phone: '9671162385',
//             countryCode: '+91'
//         },
//         {
//             firstName: 'Rahul',
//             lastName: 'Verma',
//             phone: '7206016012',
//             countryCode: '+91'
//         },
//         {
//             firstName: 'Naveen',
//             lastName: 'Jamdagani',
//             phone: '7027024333',
//             countryCode: '+91'
//         }
//     ];

    var messages = 
    [
        {
            phone: '9466462396',
            countryCode: '+91',
            message: 'This is some demo text',
            full_name: 'Hemant Yadav',
            time: 44443,
        },
    ];

    $(document).ready(function () {

        var _ = (function () {
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
            };
        })();

        _.tabMainBLock();

        var Contacts = (function () {
            var contacts = [];

            return {
                showAddContact : function () {
                    $('#add-contact > a, #cancel-contact').on('click', function () {
                        Contacts.showContactForm();
                    });
                },

                showContactForm : function () {
                    $('#add-contact form input').val('');
                    $('#add-contact form').toggleClass('active');
                },

                listContacts : function () {
                    $('.msg-box').show();

                    contacts = JSON.parse(localStorage.getItem('contacts'));

                    if(contacts.length === 0 || !contacts || contacts == null) {
                        contacts = [];
                    }
                    else {
                        contacts.forEach(function(contact) {
                            Contacts.appendContact(contact);
                        });
                    }               
                },
                
                viewContact : function () {
                    $('.visible-contact > div:first-child').on('click', function () {
                        $(this).closest('li').toggleClass('active');
                    });
                },

                saveContact : function () {
                    $('#save-contact').on('click', function () {
                        if(formValidator.validateValues('add-contact-form')) {
                            var contact = {
                                firstName: $('#fname').val(),
                                lastName: $('#lname').val(),
                                phone: $('#cnum').val(),
                                countryCode: '+' + $('#ccode').val(),
                            };

                            $('#add-contact input').val('');
                            contacts.push(contact);
                            localStorage.setItem('contacts', JSON.stringify(contacts));
                            Contacts.showContactForm();
                            Contacts.appendContact(contact);
                        }
                    });
                },

                appendContact : function (contact) {
                    var contactCard = 
                    `<li>
                        <div class="visible-contact clearfix">
                            <div>
                                <span class="name-contact">
                                    <i class="fa fa-user"></i>
                                    <span>`+ contact.firstName + ` ` + contact.lastName +`</span>
                                </span>
                                <span class="view-contact">
                                    <i class="fa fa-sort-desc"></i>
                                    <span>View</span>
                                </span>
                            </div>
                            <div class="delete-contact">
                                <span><i class="fa fa-times"></i></span>
                            </div>
                        </div>
                        <div class="hidden-contact">
                            <div>
                                <i class="fa fa-phone"></i>
                                <span class="country-code">`+ contact.countryCode +`</span>
                                <span class="phone-num">`+ contact.phone +`</span>
                            </div>
                            <div>
                                <a href="javascript:void(0)" class="send-msg"><i class="fa fa-envelope"></i> Send Message</a>
                            </div>
                        </div>
                    </li>`;
                    

                    $('#list-contacts ul').prepend(contactCard);
                    
                    Contacts.viewContact();
                    Contacts.deleteContact();
                    
                    $('.msg-box').hide();
                },

                deleteContact : function () {
                    $('.delete-contact').one('click', function (e) {
                        $(this).off();
                        e.preventDefault();
                        e.stopImmediatePropagation();

                        var contactCard = $(this).closest('li');
                        var phn = contactCard.find('.phone-num').text();
                        
                        $.each(contacts, function (i, l) {
                            if(l.phone == phn) {
                                contacts.splice(i, 1);
                                return false;
                            }
                        });

                        localStorage.setItem('contacts', JSON.stringify(contacts));

                        if(contacts.length === 0)
                            $('#list-contacts .msg-box').show();

                        contactCard.remove();
                    });
                }
                
            }
        })();

        Contacts.listContacts();
        Contacts.showAddContact();
        Contacts.viewContact();
        Contacts.saveContact();
        Contacts.deleteContact();

        var Messages = (function () {
            return {
                listMessage : function () {
                    messages.forEach(function(message) {
                        var d = new Date();
                        message.time = d.toLocaleString();
                        Messages.appendMessage(message);
                    });
                },


                sendMessage : function () {
                    $('.send-msg').one('click', function () {
                        $(this).off();
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        if(formValidator.validateValues('add-contact-form')) {
                            var contact = {
                                firstName: $('#fname').val(),
                                lastName: $('#lname').val(),
                                phone: $('#cnum').val(),
                                countryCode: '+' + $('#ccode').val(),
                            };

                            $('#add-contact input').val('');
                            contacts.push(contact);
                            localStorage.setItem('contacts', JSON.stringify(contacts));
                            Contacts.showContactForm();
                            Contacts.appendContact(contact);
                        }
                    });
                },

                appendMessage : function (message) {
                    var messageCard = 
                    `<li class="msg-card">
                        <div class="msg-header">
                            <i class="fa fa-user"></i>
                            <span>` + message.full_name + `</span>
                        </div>
                        <div class="msg-body">
                            ` + message.message + `
                        </div>
                        <div class="msg-time">
                            <i class="fa fa-clock-o"></i>
                            <span>` + message.time + `</span>
                        </div>
                    </li>`;
                    

                    $('#list-messages ul').prepend(messageCard);
                    
                    // Messages.viewContact();
                    // Messages.deleteContact();
                    
                    $('#list-messages .msg-box').hide();
                },

            };
        })();


        Messages.listMessage();

        var formValidator = (function () {
            return {
                validateValues : function (formId) {
                    var inputs = $('#' + formId + ' input');
                    var validated = true;

                    $.each(inputs, function () {
                        var str = $(this).val().trim();
                        var re = new RegExp($(this).data('pattern'));
                        $(this).css('border-bottom','1px solid #efefef');

                        if($(this).data('pattern')) {
                            if(str === '' || !re.test(str)) {
                                $(this).css('border-bottom','1px solid red');
                                validated = false;
                                return 'false';
                            }
                        }
                    });

                    return validated;
                },
            }
        })();
    });