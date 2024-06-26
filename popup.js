document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "getBranchName" }, (response) => {
            if (response && response.branchName) {
                const branchName = response.branchName;
                navigator.clipboard.writeText(branchName).then(() => {
                    console.log(`Branch name "${branchName}" copied to clipboard.`);
                    document.getElementById('branchName').innerText = `Copied: \n "${branchName}"`;
                }).catch(err => {
                    console.error('Could not copy text: ', err);
                    document.getElementById('branchName').innerText = `Writing branch name to clipboard failed."`;
                });
            } else if (response && response.errorMessage !== null) {
                const errorMessage = response.errorMessage;
                document.getElementById('branchName').innerText = errorMessage;
            }
            else {
                document.getElementById('branchName').innerText = 'Failed to fetch branch name. See console for more details.';
            }
        });

        // Close the popup after 5 seconds
        setTimeout(() => {
            window.close();
        }, 3500);

    });
});
