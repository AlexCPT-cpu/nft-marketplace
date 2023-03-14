import { RankingItemProps } from '@/types/types'
import Image from 'next/image'
import React from 'react'

const TableChild = ({ name, volume, tw4, svd, floor, owners, items }: RankingItemProps) => {
  return (
    <tr className="mb-2 cursor-pointer border-t-slate-900 dark:border-t-gray-700 border-t-0 hover:border-t">
    <td scope="row" className="px-6 py-4 whitespace-nowrap capitalize flex flex-row items-center">
      <Image src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${name}`} className='mr-4' alt={name ?? ''} width={40} height={40} />
      {name}
    </td>
    <td scope="row" className="px-6 py-4 pl-12 whitespace-nowrap">
      {(volume)?.toFixed(3) ?? '- -'}&nbsp;BNB
    </td>
    <td scope="row" className="px-6 py-4 whitespace-nowrap">
      {(tw4)?.toFixed(2) ?? '- -'}%
    </td>
    <td scope="row" className="px-6 py-4 whitespace-nowrap">
      {(svd)?.toFixed(2) ?? '- -'}%
    </td>
    <td scope="row" className="px-6 py-4 whitespace-nowrap">
      {(floor)?.toFixed(2) ?? '- -'}
    </td>
    <td scope="row" className="px-6 py-4 whitespace-nowrap">
      {owners ?? '- -'}
    </td>
    <td scope="row" className="px-6 py-4 whitespace-nowrap">
      {items ?? '- -'}
    </td>
    </tr>
  )
}


TableChild.defaultProps = {
  name:'Smith Rowe',
  volume: 0.89,
  tw4: 234,
  svd: 543,
  floor: 0.05,
  owners: 43,
  items: 234
}

export default TableChild