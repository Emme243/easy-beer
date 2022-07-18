# Preguntas técnicas
### ¿Has aplicado los principios SOLID?
Sí, he aplicado los principios SOLID. En la parte de la implementación de la clase api he utilizado los principios de responsabilidad única, Open/Closed e Interface Segregation.
También he utilizado el principio de responsabilidad única para la creación de los componentes del proyecto, cada cual tiene su propia tarea.
### ¿Cuánto tiempo has estado pensando y escribiendo tests del código? Si hubieras tenido mucho más tiempo... ¿Qué habrías añadido?
He hecho los tests del código en un lapso de 2 días. Creo que he añadido todos los test principales para cubrir la principal ruta crítica de la aplicación. Quizá lo que hubiera añadio sería pruebas a la clase api, no lo hice porque no es una clase con tantísimos métodos, solamente utiliza el método get.
### ¿Cómo mejorarías la API que has usado?
- Crearía más endpoints para esta api, por ejemplo, un endpoint que me traiga la cantidad total de cervezas según el criterio solicitado para crear la paginación de forma dinámica. Se darán cuenta en mi código que la paginación tiene un número 8 fijo, no lo calculo de forma dinámica (total_of_pages = Math.ceil(total_of_beers / beers_per_page)), ya que no hay forma de hacer.
- Haría que el api aceptara más parámetros, por ejemplo el parámetro de ordenación, para que pueda ordenar los resultados de forma ascendente o descendente según la propiedad solicitada (/api/beers?order_by=name&order_direction=asc).
- La api actualmente regresa mucha información que no es utilizada, lo que haría sería migrar esta api a una con graphql para obtener solamente los datos que necesito (no lo veo necesario para este pequeño proyecto, pero para uno grande sí), o tratar de limitar la información que regresa (al menos para este ejercicio está bien). 
### ¿Crees que esta API soporta peticiones CORS? ¿Cómo has llegado a esa conclusión?
Sí acepta, al realizar una prueba con postman regresa las cabeceras de respuesta Access-Control-Allow-Origin: *
### ¿Cómo rastrearías un problema de rendimiento en producción? ¿Alguna vez has tenido que hacerlo?
A decir verdad, no sabría cómo, nunca lo he hecho.
### Descríbete a ti mismo en formato JSON.
{
    "name": "Emmanuel",
    "age": "21",
    "marital_status": "single",
    "profession": "Desarrollador Frontend",
    "technologiesIKnow": [
        "JavaScript",
        "HTML",
        "CSS",
        "TypeScript",
        "React",
        "Vue",
        "TailwindCSS",
        "Scss",
        "NuxtJS",
    ],
    "hobbies": ["Tocar la guitarra", "Aprender francés", "Leer", "Jugar videojuegos", "Hacer podcast"],
    "languages": [
        {
            "name": "Español",
            "level": "Native",
        },
        {
            "name": "Inglés",
            "level": "Advanced",
        },
        {
            "name": "Francés",
            "level": "Basic",
        },
    ],
}
