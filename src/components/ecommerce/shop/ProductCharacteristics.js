import React from 'react'

export const ProductCharacteristics = ({attributes}) => {
    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <tbody className="bg-white divide-y divide-gray-200">
                            {attributes.map((attribute) => (
                            <tr key={attribute.id}>
                                <td className="px-6 py-2 w-1/2">
                                    {attribute.name  }
                                </td>
                                <td className="px-6 py-2 w-1/2">
                                    {!attribute.value_name ? '-' : attribute.value_name}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
    )
}
