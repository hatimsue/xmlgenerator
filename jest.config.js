export default {
    testEnvironment: 'node',
    clearMocks: true,
    moduleFileExtensions: ['js'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    verbose: true, // muestra el nombre de cada test
    collectCoverage: true, // activa la cobertura
    coverageDirectory: 'coverage', // carpeta donde guardar el informe de cobertura
    coverageReporters: ['html', 'text-summary'], // genera HTML y resumen en consola

    reporters: [
        'default', // sigue mostrando por consola
        ['jest-html-reporter', {
            pageTitle: 'Reporte de pruebas',
            outputPath: 'report/test-report.html',
            includeFailureMsg: true,
            includeConsoleLog: true
        }]
    ],
}
