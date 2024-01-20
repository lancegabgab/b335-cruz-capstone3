import { useEffect, useState, useContext } from 'react';
import ProductCard from '../components/ProductCard';
import UserContext from '../UserContext';
import UserView from '../components/UserView';
import AdminView from '../components/AdminView';

export default function Products() {

	const { user } = useContext(UserContext);

	// Checks to see if the mock data was captured
	// console.log(coursesData);
	// console.log(coursesData[0]);

	// State that will be used to store the courses retrieved from the database
	const [products, setProducts] = useState([]);


	const fetchData = () => {

		// Allows to have a dynamic url depending whether the user that's logged in is an admin or not
		let fetchUrl = user.isAdmin === true ? `${process.env.REACT_APP_API_URL}/products/all` : `${process.env.REACT_APP_API_URL}/products/`

		fetch(fetchUrl, {
			headers: {
				Authorization: `Bearer ${ localStorage.getItem('access') }`
			}
		})
		.then(res => res.json())
		.then(data => {
		    
		    console.log(data);
		    // console.log(typeof data.message);

		    // Sets the "courses" state to map the data retrieved from the fetch request into several "CourseCard" components
		    // If the data.message is not a string or equal to undefined it will set the courses state with the courses from fetch
		   	setProducts(data)
		   	console.log(products);
		    // if (data.product) {
		    // 	setProducts(data);
		    // } else {
		    // 	setProducts([]);
		    // }
		    //console.log(products);

		});

		
	}


	// Retrieves the courses from the database upon initial render of the "Courses" component
    useEffect(() => {

		fetchData()

    }, []);

	

	return(
		<>
            {
            	(user.isAdmin === true) ?
            		<AdminView productsData={products} fetchData={fetchData} />

            		:

            		<UserView productsData={products} />

        	}
        </>
	)
}
