document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('imageInput');
    const preview = document.getElementById('preview');
    const error = document.getElementById('error');
    const uploadBtn = document.getElementById('uploadBtn');
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes

    imageInput.addEventListener('change', () => {
        error.style.display = 'none';
        uploadBtn.disabled = true;
        preview.style.display = 'none';

        const file = imageInput.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            error.textContent = 'Please select an image file.';
            error.style.display = 'block';
            return;
        }

        // Validate file size
        if (file.size > maxSize) {
            error.textContent = 'Image size exceeds 2MB.';
            error.style.display = 'block';
            return;
        }

        // Show preview
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.src = e.target.result;
            preview.style.display = 'block';
            uploadBtn.disabled = false;
        };
        reader.readAsDataURL(file);
    });

    uploadBtn.addEventListener('click', async () => {
        const file = imageInput.files[0];
        if (!file) return;

        // Prepare form data
        const formData = new FormData();
        formData.append('image', file);

        try {
            // Replace with your server endpoint
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert('Image uploaded successfully!');
                imageInput.value = ''; // Reset input
                preview.style.display = 'none';
                uploadBtn.disabled = true;
            } else {
                error.textContent = 'Upload failed. Try again.';
                error.style.display = 'block';
            }
        } catch (err) {
            error.textContent = 'An error occurred during upload.';
            error.style.display = 'block';
        }
    });
});