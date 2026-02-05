onload = () => {
    document.body.classList.remove("container");

    // Detect max inline --d delays to estimate when flower bloom animation completes
    const delayEls = document.querySelectorAll('[style*="--d:"]');
    let maxDelaySec = 0;
    delayEls.forEach(el => {
        const s = el.getAttribute('style');
        const m = s && s.match(/--d\s*:\s*([0-9.]+)s/);
        if (m) {
            const v = parseFloat(m[1]);
            if (v > maxDelaySec) maxDelaySec = v;
        }
    });

    // If nothing found, assume bloom takes ~3s
    const bloomMs = (maxDelaySec || 3) * 1000;
    const waitAfterBloomMs = 5000; // wait 7 seconds after bloom

    // Start timer: when bloom finished + 7s -> show question
    setTimeout(() => {
        showValentineQuestion();
    }, bloomMs + waitAfterBloomMs);

    function showValentineQuestion() {
        // Show a short prompt before asking the main question
        Swal.fire({
            title: 'i want ask u again',
            confirmButtonText: 'OK'
        }).then(() => {
            Swal.fire({
                title: 'Will you be my valentine?',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No'
            }).then(result => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Thank u',
                        iconHtml: '🌸',
                        customClass: { icon: 'swal2-icon-custom' },
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true
                    }).then(() => {
                        const num = '082123432959';
                        const waNum = num.replace(/^0+/, '62');
                        const text = encodeURIComponent('yes i want');
                        window.location.href = `https://wa.me/${waNum}?text=${text}`;
                    });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire({
                        title: 'You are mean to me.',
                        iconHtml: '😡',
                        customClass: { icon: 'swal2-icon-custom' },
                        confirmButtonText: 'OK'
                    });
                }
            });
        });
    }
};
