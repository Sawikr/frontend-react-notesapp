const Info = () => {

    const currentYear = new Date().getFullYear();

    return (
        <div className="text-center">
            <div>
                <p></p>
                <h8 className="info primary-color font-italic">Copyright ©{currentYear} Radosław Sawicki</h8>
            </div>
        </div>
    );
}
 
export default Info;