import Space from "./Space";

const Copyright = () => {

    const currentYear = new Date().getFullYear();

    return (
        <div className="main-content">
            <form className="text-center">
                <h6 className="text-center">
                    <span className="primary-color ml-1">Copyright</span>
                    : ©{currentYear} Radosław Sawicki
                </h6>
                <Space/>
                <h6 className="text-center">
                    <span className="primary-color ml-1">Notes App</span>
                    : Version 1.0.0</h6>
                <h6 className="text-center">
                    <span className="primary-color ml-1">Release date</span>
                    : September 1, 2023</h6>
                <Space/>
                <Space/>
                <h6 className="text-center">Description:</h6>
                <p></p>
                <label>
                    <h7 className="text-center" style={{fontStyle: 'italic'}}>Notes App is a REST API based application. This is an application for
                        creating, editing, deleting and emailing personal notes. The application also includes current
                        exchange rates and weather forecast.</h7>
                </label>
            </form>
            <Space/>
        </div>
    )
}

export default Copyright;