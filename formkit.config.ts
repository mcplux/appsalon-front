import { generateClasses } from "@formkit/themes"

const config = {
  config: {
    classes: generateClasses({
      global: {
        wrapper: 'space-y-2 mb-3',
        message: 'bg-red-500 text-white p-2 text-center text-sm rounded font-bold my-2',
        label: 'block mb-1 font-bold text-lg text-white',
        input: 'w-full p-3 border border-gray-300 rounded text-gray-700 placeholder-gray-500',
      },
      submit: {
        input: '$reset bg-blue-500 hover:bg-blue-600 transition-colors p-3 text-white font-bold rounded w-full mt-10',
      }
    })
  }
}

export default config
