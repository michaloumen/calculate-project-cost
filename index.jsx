function createDate(year, month, day) {
  return new Date(year, month - 1, day);
}

function calculateProjectCost(monthlySalary, projects) {
  function calculateDailyCost(salary, daysInMonth) {
    return salary / daysInMonth;
  }

  let totalCosts = {};

  for (const project of projects) {
    const { startDate, endDate } = project;

    // Calcula o custo total do projeto
    let projectTotalCost = 0;

    for (let date = startDate.getTime(); date <= endDate.getTime(); date += 24 * 60 * 60 * 1000) {
      const currentDate = new Date(date);
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // Ajusta os meses para 1-12
      const daysInMonth = new Date(year, month, 0).getDate();
      const dailyCost = calculateDailyCost(monthlySalary, daysInMonth);

      // Verifica os projetos que ocorrem no mesmo dia
      const sameDayProjects = projects.filter(otherProject =>
        otherProject !== project &&
        otherProject.startDate <= currentDate &&
        otherProject.endDate >= currentDate
      );

      // Divide o dailyCost igualmente entre os projetos que acontecem no mesmo dia
      const dividedDailyCost = sameDayProjects.length > 0 ? dailyCost / (sameDayProjects.length + 1) : dailyCost;

      projectTotalCost += dividedDailyCost;
    }

    totalCosts[project.name] = projectTotalCost;
  }

  return totalCosts;
}

// Defina o salário mensal e os projetos
const monthlySalary = 3100; // Salário mensal do time em reais
const projects = [
  { name: 'Projeto A', startDate: createDate(2023, 2, 27), endDate: createDate(2023, 3, 02) },
  { name: 'Projeto B', startDate: createDate(2023, 3, 02), endDate: createDate(2023, 3, 03) },
  // { name: 'Projeto C', startDate: createDate(2023, 7, 01), endDate: createDate(2023, 7, 31) },
  // Adicione mais projetos aqui se necessário
];

// Calcule o custo de cada projeto individualmente
const projectCosts = calculateProjectCost(monthlySalary, projects);
for (const projectName in projectCosts) {
  console.log(`O custo do projeto ${projectName} foi de ${projectCosts[projectName].toFixed(2)} reais.`);
}

// considere que o se o projeto teve 1 dia ele começou e terminou no mesmo dia 
// se ele teve 2 dias, ele começou em um dia e terminou no próximo dia consecutivo
// ou seja, o endDate deve ser o último dia que o projeto ainda estava sendo executado