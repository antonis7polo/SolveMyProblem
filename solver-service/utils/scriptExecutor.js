const { exec } = require('child_process');

function executePythonSolver(scriptPath, dataPath, params) {
    // Create an array of parameters to pass to the Python script
    let args = [scriptPath, dataPath];
    Object.keys(params).forEach(key => {
        args.push(params[key]); // Add each parameter value to the args array
    });

    // Join the arguments into a command string
    const command = `python ${args.join(' ')}`;

    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return reject(error);
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return reject(stderr);
            }
            resolve(stdout.trim());
        });
    });
}

module.exports = { executePythonSolver };

