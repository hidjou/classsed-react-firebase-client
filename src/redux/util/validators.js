import validator from 'validator';


export const validateSignUpData = (data) => {
	let errors = {};

	// email
	if (validator.isEmpty(data.email)) errors.email = 'Email must not be empty.';
	else if (!validator.isEmail(data.email)) errors.email = 'Must be a valid email address.';

	// password
	if (validator.isEmpty(data.password)) errors.password = 'Must not be empty.';
	else if (!validator.isLength(data.password, { min: 6, max: 14 })) errors.password = 'password must be at least 6 characters long'

	// confirmPassword 
	if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passwords Must match.';

	// handle
	if (validator.isEmpty(data.handle)) errors.handle = 'Must not be empty.';
	else if (!validator.isAlpha(data.handle, 'en-US')) errors.handle = 'handle should contains only letters (a-zA-Z).';

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false
	}
}

export const validateLogInData = (data) => {
	let errors = {};

	// email
	if (validator.isEmpty(data.email)) errors.loginEmail = 'Must not be empty';
	else if (!validator.isEmail(data.email)) errors.loginEmail = 'Must be a valid email address';

	// password
	if (validator.isEmpty(data.password)) errors.loginPassword = 'Must not be empty';
	else if (!validator.isLength(data.password, { min: 6, max: 14 })) errors.loginPassword = 'password must be at least 6 characters long';

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false
	}
}

export const validateCommentData = (data) => {
	let errors = {};

	// comment
	if (validator.isEmpty(data.body)) errors.comment = 'Must not be empty';

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false
	}
}

export const validateProfielImage = (formData) => {
	let errors = {};

	const imageToUpload = formData.get('image');

		const mime = imageToUpload.name.substring(imageToUpload.name.lastIndexOf('.') + 1).toLowerCase();
		const size = Math.round((imageToUpload.size / 1024));
		const allowedTypes = ['png', 'jpeg', 'jpg'];

		if (!allowedTypes.includes(mime))
			errors.image = 'Wrong file type submitted';
		else if (size >= 4096)
			errors.image = 'Image too Big, please select a file less than 4mb';
		else if (size <= 500)
			errors.image = 'Image too small, please select a file greater than 500 kb';

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false
	}

}

export const validateScreamData = (data) => {
	let errors = {};

	// scream
	if (validator.isEmpty(data.body)) errors.scream = 'Must not be empty';

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false
	}
}

export const validateUserDetails = (data) => {

	let errors = {};

	if (!validator.isEmpty(data.bio.trim())) {
		if (!validator.isLength(data.bio.trim(), { min: 10, max: 80 }))
			errors.bio = 'Bio must be at least 10 characters long';
	}

	if (!validator.isEmpty(data.website.trim())) {

		if (!validator.isURL(data.website.trim(), { protocols: ['http', 'https'] }))
			errors.website = 'Invalid URL';

		// if (data.website.trim().substring(0, 4) !== 'http') {
		// 	userDetails.website = `http://${data.website.trim()}`;
		// } else userDetails.website = data.website;

	} else data.website = data.website;

	// if (!validator.isEmpty(data.location.trim())) userDetails.location = data.location;

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false
	}
}