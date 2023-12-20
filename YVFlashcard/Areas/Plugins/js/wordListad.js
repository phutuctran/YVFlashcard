(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Sidebar Toggler
    $('.sidebar-toggler').click(function () {
        $('.sidebar, .content').toggleClass("open");
        return false;
    });


    // Progress Bar
    $('.pg-bar').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});

})(jQuery);

function loadCreateImage() {
    var fileInput = document.getElementById('InputImg');
    var createImg = document.getElementById('createImg');

    // Check if a file is selected
    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();

        // Set up the FileReader to read the selected file
        reader.onload = function (e) {
            // Set the source of the createImg to the loaded image
            createImg.src = e.target.result;
        };

        // Read the selected file as a data URL
        reader.readAsDataURL(fileInput.files[0]);
    }
}

function loadImage() {
    var fileInput = document.getElementById('fileInput');
    var modalImg = document.getElementById('modalImg');

    // Check if a file is selected
    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();

        // Set up the FileReader to read the selected file
        reader.onload = function (e) {
            // Set the source of the modalImg to the loaded image
            modalImg.src = e.target.result;
        };

        // Read the selected file as a data URL
        reader.readAsDataURL(fileInput.files[0]);
    }
}

function saveLesson() {
    let lessonName = document.getElementById("lessonName").value;
}

function saveAddVocab() {
    let imgSrc = document.getElementById("InputImg").src;
    let vocab = document.getElementById("createVocab").value;
    let pro = document.getElementById("createPro").value;
    let part = document.getElementById("createPart").value;
    let def = document.getElementById("createDef").value;
}

function saveEditVocab() {
    let imgSrc = document.getElementById("modalImg").src;
    let vocab = document.getElementById("editVocab").value;
    let pro = document.getElementById("editPro").value;
    let part = document.getElementById("editPart").value;
    let def = document.getElementById("editDef").value;
}


function editHandle(buttonId) {
    const imgModal = document.getElementById("modalImg");
    let vocab = document.getElementById("editVocab").value;
    let pro = document.getElementById("editPro").value;
    let part = document.getElementById("editPart").value;
    let def = document.getElementById("editDef").value;
}
