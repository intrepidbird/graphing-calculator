$(document).ready(function() {
    $('#calculatorForm').submit(function(e) {
        e.preventDefault();
        let equations = $('#equations').val().split(','); // Split equations by comma
        let minX = parseFloat($('#minX').val());
        let maxX = parseFloat($('#maxX').val());

        if (isNaN(minX) || isNaN(maxX) || minX >= maxX) {
            alert('Invalid range. Please check your input.');
            return;
        }

        let canvas = document.getElementById('graph').getContext('2d');
        let xValues = [];
        let datasets = [];

        for (let equation of equations) {
            equation = equation.trim(); // Remove leading/trailing spaces
            let yValues = [];

            try {
                for (let x = minX; x <= maxX; x += 0.1) {
                    xValues.push(x);
                    // Replace "^" with "**" in the equation
                    let equationWithDoubleAsterisk = equation.replace(/\^/g, '**');
                    let result = eval(equationWithDoubleAsterisk);

                    // Check if the result is a valid number, not NaN
                    if (!isNaN(result)) {
                        yValues.push(result);
                    } else {
                        // Handle the case where the equation is invalid
                        throw new Error('Invalid Equation');
                    }
                }

                datasets.push({
                    label: equation,
                    data: yValues,
                    borderColor: getRandomColor(),
                    borderWidth: 2,
                });
            } catch (error) {
                // Handle the error and provide feedback to the user
                console.error(error);
                alert(`Invalid equation: "${equation}". Please check your input.`);
                return;
            }
        }

        let chart = new Chart(canvas, {
            type: 'line',
            data: {
                labels: xValues,
                datasets: datasets,
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'X'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Y'
                        }
                    }
                }
            }
        });
    });
});

function getRandomColor() {
    // Generates a random hexadecimal color
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}
