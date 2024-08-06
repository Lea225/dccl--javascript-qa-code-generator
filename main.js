document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('url-input');
    const generateBtn = document.getElementById('generate-btn');
    const qrCodeContainer = document.getElementById('qr-code-container');
    const actions = document.getElementById('actions');
    const downloadBtn = document.getElementById('download-btn');
    const shareBtn = document.getElementById('share-btn');
    const firstSection = document.getElementById('first-section');
    const resultContainer = document.getElementById('result-container');

    generateBtn.addEventListener('click', () => {
        const url = urlInput.value;
        if (url) {
            qrCodeContainer.innerHTML = ''; // Clear previous QR code
            QRCode.toCanvas(document.createElement('canvas'), url, { width: 200, height: 200 }, function (error, canvas) {
                if (error) console.error(error);
                // Apply styles to the canvas
                canvas.style.width = '450px'; // Set the height
                canvas.style.height = '300px'; // Set the height
                canvas.style.borderRadius = '20px'; // Set the border radius

                qrCodeContainer.appendChild(canvas);
                actions.style.display = 'flex';

                // Set up download button
                downloadBtn.onclick = () => {
                    const link = document.createElement('a');
                    link.href = canvas.toDataURL();
                    link.download = 'qrcode.png';
                    link.click();
                };

                // Set up share button
                shareBtn.onclick = () => {
                    navigator.clipboard.writeText(url).then(() => {
                        alert('URL copied to clipboard!');
                    }, (err) => {
                        console.error('Failed to copy text: ', err);
                    });
                };
            });

            // Hide first section and show result container
            firstSection.style.display = 'none';
            resultContainer.style.display = 'block';
        } else {
            alert('Please enter a valid URL.');
        }
    });
});
