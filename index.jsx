function calculateProjectCost(monthlySalary, startDate, endDate) {
  function calculateDailyCost(salary, daysInMonth) {
    return salary / daysInMonth;
  }

  let totalCost = 0;

  for (let year = startDate.getFullYear(); year <= endDate.getFullYear(); year++) {
    const startMonth = (year === startDate.getFullYear()) ? startDate.getMonth() : 0;
    const endMonth = (year === endDate.getFullYear()) ? endDate.getMonth() : 11;

    for (let month = startMonth; month <= endMonth; month++) {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const dailyCost = calculateDailyCost(monthlySalary, daysInMonth);

      if (year === startDate.getFullYear() && year === endDate.getFullYear() && month === startDate.getMonth() && month === endDate.getMonth()) {
        const daysInProject = (endDate.getDate() - startDate.getDate()) + 1;
        totalCost += daysInProject * dailyCost;
      } else if (year === startDate.getFullYear() && month === startDate.getMonth()) {
        const daysInStartMonth = (new Date(year, month + 1, 0).getDate() - startDate.getDate()) + 1;
        totalCost += daysInStartMonth * dailyCost;
      } else if (year === endDate.getFullYear() && month === endDate.getMonth()) {
        const daysInEndMonth = endDate.getDate();
        totalCost += daysInEndMonth * dailyCost;
      } else {
        totalCost += daysInMonth * dailyCost;
      }
    }
  }

  return totalCost;
}

// Defina o salário mensal e as datas de início e fim do projeto
const monthlySalary = 3000; // Salário mensal do time em reais
const startDate = new Date(2021, 1, 28); // 27 de fevereiro de 2023
const endDate = new Date(2021, 2, 1);    // 1 de março de 2023

// Calcule o custo do projeto
const projectCost = calculateProjectCost(monthlySalary, startDate, endDate);

console.log(`O projeto custou ${projectCost.toFixed(2)} reais.`);


