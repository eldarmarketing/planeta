export default function OrderDetailsTable() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/3">
      <h2 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90">
        Детализация заказ-наряда
      </h2>
      <div className="overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800">
        <div className="custom-scrollbar overflow-x-auto">
          <table className="min-w-full text-left text-sm text-gray-700 dark:border-gray-800">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr className="border-b border-gray-100 whitespace-nowrap dark:border-gray-800">
                <th className="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-700 dark:text-gray-400">
                  №
                </th>
                <th className="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-500 dark:text-gray-400">
                  Наименование
                </th>
                <th className="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-700 dark:text-gray-400">
                  Кол-во
                </th>
                <th className="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-700 dark:text-gray-400">
                  Цена
                </th>
                <th className="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-700 dark:text-gray-400">
                  Скидка
                </th>
                <th className="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-700 dark:text-gray-400">
                  Итого
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white dark:divide-gray-800 dark:bg-white/[0.03]">
              <tr>
                <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                  1
                </td>
                <td className="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-800 dark:text-white/90">
                  Замена масла ДВС
                </td>
                <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                  1
                </td>
                <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                  2 500 ₽
                </td>
                <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                  0%
                </td>
                <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                  2 500 ₽
                </td>
              </tr>
              <tr>
                <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                  2
                </td>
                <td className="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-800 dark:text-white/90">
                  Масло моторное BMW 5W-30 (5л)
                </td>
                <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                  1
                </td>
                <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                  8 500 ₽
                </td>
                <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                  10%
                </td>
                <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                  7 650 ₽
                </td>
              </tr>
              <tr>
                <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                  3
                </td>
                <td className="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-800 dark:text-white/90">
                  Фильтр масляный BMW
                </td>
                <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                  1
                </td>
                <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                  1 800 ₽
                </td>
                <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                  0%
                </td>
                <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                  1 800 ₽
                </td>
              </tr>
              <tr>
                <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                  4
                </td>
                <td className="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-800 dark:text-white/90">
                  Замена тормозных колодок (перед)
                </td>
                <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                  1
                </td>
                <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                  4 500 ₽
                </td>
                <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                  0%
                </td>
                <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                  4 500 ₽
                </td>
              </tr>
              <tr>
                <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                  5
                </td>
                <td className="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-800 dark:text-white/90">
                  Колодки тормозные BMW (комплект)
                </td>
                <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                  1
                </td>
                <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                  12 000 ₽
                </td>
                <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                  5%
                </td>
                <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                  11 400 ₽
                </td>
              </tr>
              <tr>
                <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                  6
                </td>
                <td className="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-800 dark:text-white/90">
                  Диагностика ходовой части
                </td>
                <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                  1
                </td>
                <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                  3 000 ₽
                </td>
                <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                  100%
                </td>
                <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                  0 ₽
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-wrap justify-between sm:justify-end">
        <div className="mt-6 w-full space-y-1 text-right sm:w-[220px]">
          <p className="mb-4 text-left text-sm font-medium text-gray-800 dark:text-white/90">
            Итого по заказ-наряду
          </p>
          <ul className="space-y-2">
            <li className="flex justify-between gap-5">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Работы
              </span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
                7 000 ₽
              </span>
            </li>
            <li className="flex justify-between gap-5">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Запчасти
              </span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
                20 850 ₽
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Скидка
              </span>
              <span className="text-sm font-medium text-success-600 dark:text-success-500">
                -5 250 ₽
              </span>
            </li>
            <li className="flex items-center justify-between border-t border-gray-100 pt-2 dark:border-gray-800">
              <span className="font-medium text-gray-700 dark:text-gray-400">
                Итого
              </span>
              <span className="text-lg font-semibold text-gray-800 dark:text-white/90">
                27 850 ₽
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
