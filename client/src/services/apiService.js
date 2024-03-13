
const apiUrl = process.env.REACT_APP_API_URL

export const fetchApiData = async (endpoint, method = 'GET', data = null) => {
    console.log('Fetching', endpoint, method, data);
    try {
        const resData = await fetch(`${apiUrl}${endpoint}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: data? JSON.stringify(data) : undefined
        });

        const result = await resData.json();

        if (!resData.ok) {
            throw new Error(resData.error);
        }
    
        return result
        
    } catch (error) {
        console.log(error, 'Error')
    }
  };