<script>
    document.getElementById('whatsapp-form').addEventListener('submit', function(e) {
        // 1. Prevent the default form submission
        e.preventDefault();
        
        // 2. Capture the input values
        const nameInput = document.getElementById('name').value;
        const messageInput = document.getElementById('message').value;
        const myPhoneNumber = "233271977814"; // Your WhatsApp number
        
        // 3. Create the professional message template
        const fullMessage = "Hello Ramstouch Beauty! My name is " + nameInput + ". " + messageInput;
        
        // 4. Encode the message for the URL
        const encodedMessage = encodeURIComponent(fullMessage);
        
        // 5. Build the WhatsApp link
        const whatsappUrl = "https://wa.me/" + myPhoneNumber + "?text=" + encodedMessage;
        
        // 6. Action: Open WhatsApp in a new tab/app
        window.open(whatsappUrl, '_blank');
        
        // 7. Action: Redirect the current website tab to the Success Page
        // Make sure you have created success.html in the same folder
        window.location.href = "success.html";
    });
</script>
