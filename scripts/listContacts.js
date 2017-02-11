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


        var Messages = (function () {
            var messages = [];
            return {
                listMessage : function () {
                    $('#list-messages .msg-box').show();
                    
                    messages = JSON.parse(localStorage.getItem('messages'));
                    
                    if(!messages || messages.length === 0) {
                        messages = [];
                    }
                    else {
                        messages.forEach(function(message) {
                            Messages.appendMessage(message);
                        });
                    }
                },

                toggleMessageBox : function () {
                    $('#send-message .close').on('click', function () {
                        $('#send-message').toggleClass('hide');
                    });
                },

                sendMessage : function () {
                    $('.send-msg').on('click', function (e) {
                        // $(this).off();
                        // e.preventDefault();
                        e.stopImmediatePropagation();
                        var msgObject = {};

                        var msgCard = $(this).closest('li');

                        var OTP = Math.floor(100000 + Math.random() * 900000);;
                        var d = new Date();

                        msgObject.phone = msgCard.find('.phone-num').text();
                        msgObject.countryCode = msgCard.find('.country-code').text();
                        msgObject.message = 'Hi. Your OTP is: ' + OTP;
                        msgObject.full_name = msgCard.find('.name-contact span').text();
                        msgObject.time = d.toLocaleString();
                        
                        
                        $('#message-box').val(msgObject.message);
                        $('#send-message').toggleClass('hide');

                        Messages.postMessage(msgObject);
                    });
                },

                postMessage : function (msgObject) {
                    $('#post-msg-api').on('click', function (e) {
                        e.stopImmediatePropagation();

                        messages.push(msgObject);
                        
                        $('#send-message').toggleClass('hide');
                        Messages.appendMessage(msgObject);
                        localStorage.setItem('messages', JSON.stringify(messages))
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
                    
                    $('#list-messages .msg-box').hide();
                },

            };
        })();

        Messages.listMessage();
        Messages.sendMessage();
        Messages.toggleMessageBox();



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
                    $('#list-contacts .msg-box').show();

                    contacts = JSON.parse(localStorage.getItem('contacts'));

                    if(!contacts || contacts.length === 0) {
                        contacts = [];
                    }
                    else {
                        contacts.forEach(function(contact) {
                            Contacts.appendContact(contact);
                        });
                    }               
                },
                
                viewContact : function () {
                    $('.visible-contact > div:first-child').on('click', function (e) {
                        e.stopImmediatePropagation();
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
                    Messages.sendMessage();
                    
                    $('#list-contacts .msg-box').hide();
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
                        

                        contactCard.fadeOut('slow', function () {
                            $(this).remove();
                        });
                    });
                }
                
            }
        })();

        Contacts.listContacts();
        Contacts.showAddContact();
        Contacts.viewContact();
        Contacts.saveContact();
        Contacts.deleteContact();

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
