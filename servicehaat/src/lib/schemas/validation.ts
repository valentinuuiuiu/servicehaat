

import * as yup from 'yup'
import { ServiceCategory } from './serviceCategories'

export const providerProfileSchema = yup.object().shape({
  uid: yup
    .string()
    .required()
    .matches(/^[a-zA-Z0-9_-]{20,}$/, 'Invalid UID format'),
    
  businessName: yup
    .string()
    .required('Business name is required')
    .min(3, 'Must be at least 3 characters')
    .max(50, 'Cannot exceed 50 characters'),
    
  serviceCategory: yup
    .string()
    .oneOf(ServiceCategory.values, 'Invalid service category')
    .required('Service category is required'),
    
  description: yup
    .string()
    .required('Description is required')
    .min(20, 'Description must be at least 20 characters')
    .max(500, 'Description cannot exceed 500 characters'),
    
  photos: yup
    .array()
    .of(yup.string().url('Must be valid image URLs'))
    .min(1, 'At least one photo is required')
    .max(10, 'Maximum 10 photos allowed'),
    
  priceRange: yup.object().when('plan', {
    is: 'paid',
    then: yup.object({
      min: yup.number().required().min(0, 'Minimum price must be positive'),
      max: yup.number().required().min(
        yup.ref('min'), 
        'Max price must be greater than min price'
      )
    }),
    otherwise: yup.object().optional()
  }),
  
  plan: yup
    .string()
    .oneOf(['free', 'paid'], 'Invalid plan selection')
    .required('Plan selection is required')
})

