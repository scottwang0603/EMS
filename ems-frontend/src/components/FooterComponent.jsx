import React from 'react';

function FooterComponent() {

    const year = new Date().getFullYear();

    return (
        <div>
            <footer className="footer">Copyright &copy; {year}
            </footer>
        </div>
    );
}

export default FooterComponent;