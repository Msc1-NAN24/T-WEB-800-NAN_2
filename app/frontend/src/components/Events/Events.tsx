import EventCard from "./EventCard/EventCard";

export default function Events() {
    const events = [
        {
          id: 1,
          title: 'Atelier maison: créer ses pâtisseries',
          date: '21 janvier à 16h',
          lieu: 'Nantes, commerce',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis eu magna ac lacinia. Quisque scelerisque neque sit amet dignissim sodales.'
        },
        {
            id: 2,
            title: 'Compétitionn de pétanque chez José',
            date: '22-23 janvier à 16h',
            lieu: 'Nantes, Beaulieu',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis eu magna ac lacinia. Quisque scelerisque neque sit amet dignissim sodales.'
        }
      ]
    return (
        <>
            <h1>Events</h1>
            <h2>Evenements proche</h2>
            {events.map((evt) => {
                return (
                    <EventCard key={evt.id} title={evt.title} date={evt.date} lieu={evt.lieu} description={evt.description} />
                )
            })}
            <button>Voir plus</button>
        </>
    )
}