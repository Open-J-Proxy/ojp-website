import { DATABASE_FREEDOM_WORLDS } from './database-freedom.mjs';
import { FLOODGATE_WORLDS } from './floodgate.mjs';

const CONNECTION_CRISIS_OBJECTIVES = [
    { id: 'shared-pooling', title: 'Coordinate shared capacity' },
    { id: 'just-in-time', title: 'Acquire resources when needed' },
    { id: 'isolation-ha', title: 'Protect shared capacity' }
];

export const EBOOK_SIGNUP_URL = 'https://e3b21e9a.sibforms.com/serve/MUIFAJw5SKRLsQqBLrNFqgODA-b6m3GI2V07UYdEx9dKfRKoibEeUV5rC9p81LW8vgoatlqitkMEPO-bRLjn8XGklyNKeXIxV4VGl-jnL1SZcx1qpAXYLJUqDt2UV-MLN4-vjIFwxfjQvXWqPWQmdXUGX8p8RNIh8SPyppiwL9CeO_Bby266HAetM8-kfV1_wGzz_d48js-btk9LgQ==';

const CONNECTION_CRISIS_WORLDS = [
    {
        id: 'fantasy', name: 'The Kingdom of a Thousand Gates', genre: 'Epic fantasy',
        badge: 'Guardian of the Gates', palette: ['#244c3b', '#d2a84b'],
        description: 'Mira helps a kingdom share its couriers and keep urgent messages moving.',
        voice: 'A tale told beside the council fire',
        acts: [
            {
                title: 'The Message That Never Arrived',
                story: 'The kingdom was in danger. A village near the northern border had spotted an approaching army. Its only hope was to send a warning to the capital before nightfall. But there were no royal messengers available. Across the kingdom, dozens of messengers sat idle in peaceful villages. Ancient law required each village to keep its own messengers, even when there were no letters to deliver. Mira, a young royal courier, realized the problem. The kingdom had enough messengers. They were simply in the wrong places, bound by the wrong rules.',
                challenge: {
                    prompt: 'What should Mira propose to help the kingdom deliver urgent messages using its existing messengers?',
                    options: ['Give the border villages more permanent messengers and leave the other assignments unchanged.', 'Establish a royal messenger service that can assign available couriers to any village.', 'Require every village to predict its message volume and keep its own couriers reserved accordingly.'],
                    answer: 1,
                    explanation: 'Applications with independent connection pools may hold database connections they are not using, while other applications need capacity. Centralized pooling lets participating applications share managed backend connections more effectively.',
                    hints: ['The kingdom has enough messengers, but some are stranded in quiet villages.', 'Look for a way to coordinate couriers across villages rather than reserving more for each one.'],
                    wrong: 'Adding or forecasting more permanent village reservations leaves the kingdom’s couriers divided and unavailable where urgent work appears.'
                }
            },
            {
                title: 'The Royal Dispatch',
                story: 'Mira convinced the king to change the ancient law. Instead of permanently assigning messengers to villages, the kingdom established a Royal Dispatch. Whenever a village had a letter ready, it requested an available messenger. Once the delivery was complete, that messenger could serve another village. The first test came during the Harvest Festival. Hundreds of villagers gathered, yet the messengers were no longer waiting idly for work that might never arrive. For the first time, the kingdom’s couriers served the messages that actually needed delivering.',
                challenge: {
                    prompt: 'When should Royal Dispatch assign a messenger?',
                    options: ['At sunrise, whether or not a village has letters.', 'When the village announces that it might send letters later.', 'When a letter is ready to be delivered.'],
                    answer: 2,
                    explanation: 'Open J Proxy supports just-in-time acquisition. An application can obtain a logical JDBC connection without immediately reserving a physical database connection. Backend capacity is acquired when work requires it.',
                    hints: ['The dispatch should respond to a real letter, not a forecast.', 'Choose the moment when the delivery is ready to begin.'],
                    wrong: 'Reserving a messenger before there is a letter recreates the idle-resource problem.'
                }
            },
            {
                title: 'The Journey Through the Mountains',
                story: 'Winter arrived, and a new danger appeared. Messages bound for the northern mountains took days to deliver. More and more couriers were sent on these difficult journeys, leaving too few available for ordinary deliveries. Mira faced a difficult decision: should every available messenger be sent north? Instead, she limited how many couriers could be committed to the long mountain routes at once. The mountain deliveries continued, but villages could still send everyday messages. The kingdom had learned that sharing resources was only the beginning. Protecting them mattered too.',
                challenge: {
                    prompt: 'How should Royal Dispatch handle journeys that occupy messengers for unusually long periods?',
                    options: ['Allow long journeys to use every available messenger whenever they request one.', 'Limit how many messengers long journeys can occupy, preserving capacity for ordinary deliveries.', 'Serve all long journeys before accepting shorter deliveries.'],
                    answer: 1,
                    explanation: 'OJP’s adaptive bulkhead can segregate slow-query workloads so they are less likely to monopolize shared database connections. It protects other operations without making the slow queries themselves faster.',
                    hints: ['The mountain journeys can continue without taking every courier.', 'Protect capacity for ordinary deliveries by limiting the share used by long journeys.'],
                    wrong: 'Giving long journeys unrestricted access can leave no couriers for other messages; prioritizing them does not protect shared capacity.'
                }
            }
        ],
        victory: 'The kingdom’s warning arrived in time. Mira had not discovered more messengers or faster horses. She had discovered a better way to coordinate the resources the kingdom already possessed.'
    },
    {
        id: 'space', name: "The Fleet's Last Dock", genre: 'Space exploration',
        badge: 'Fleet Coordinator', palette: ['#10284a', '#46d9e8'],
        description: 'Commander Sol coordinates Meridian Station’s docking bays for the whole fleet.',
        voice: 'A mission log from the outer orbit',
        acts: [
            {
                title: 'Emergency at Meridian Station',
                story: '"Emergency docking requested!" Commander Sol watched a damaged research ship approach Meridian Station. Its oxygen supply was running dangerously low. The station had twelve docking bays. Yet the control system reported that every bay was unavailable. Sol checked the external cameras. Five bays were completely empty. They had been reserved by different fleets whose ships would not return for hours. The research ship circled helplessly while perfectly usable bays remained inaccessible. Sol understood that the station did not need more docking bays to solve this emergency. It needed a better way to assign them.',
                challenge: {
                    prompt: 'What should Meridian Station change?',
                    options: ['Let each fleet keep its reserved bays but periodically negotiate temporary exchanges.', 'Increase the number of bays reserved for whichever fleet has the most ships.', 'Manage the existing docking bays as a shared resource available to every fleet.'],
                    answer: 2,
                    explanation: 'Independent application pools can reserve backend database connections even when idle. OJP centralizes pooling so participating applications can draw from a coordinated pool rather than maintaining isolated reservations.',
                    hints: ['Empty bays are stranded behind separate fleet reservations.', 'Give station control a shared view of the existing bays.'],
                    wrong: 'Negotiating isolated reservations or adding private allocations does not make unused bays available to the ships waiting now.'
                }
            },
            {
                title: 'The New Docking Protocol',
                story: 'Sol introduced a new rule. No fleet would own a docking bay simply because one of its ships might arrive. Instead, each ship would request a bay when it was ready to dock. Station control would assign an available bay and release it when the ship departed. Within days, Meridian Station handled traffic more efficiently. Some hours were busy, others quiet, but unused bays were no longer reserved for ships that were not there. The station still had twelve bays. What changed was how they were used.',
                challenge: {
                    prompt: 'A cargo vessel is six hours away. When should it occupy one of the station’s limited docking bays?',
                    options: ['When it arrives and is ready to dock.', 'When it begins its journey, to ensure a bay is kept empty.', 'Whenever its fleet registers a planned journey, even if departure is uncertain.'],
                    answer: 0,
                    explanation: 'Just-in-time acquisition allows OJP to allocate a backend database connection when an operation actually needs one, instead of permanently reserving one for each idle logical connection.',
                    hints: ['A bay is useful when the ship can actually dock.', 'Do not hold the bay during the journey; assign it at arrival.'],
                    wrong: 'Reserving a bay before the ship arrives leaves a limited resource idle while other ships may need it.'
                }
            },
            {
                title: 'The Ship That Could Not Leave',
                story: 'Weeks later, a damaged cruiser docked at Meridian Station. Its repairs took far longer than expected. Then another damaged ship arrived. And another. Soon, extended repairs occupied nearly every bay. Ordinary cargo ships, which needed only brief stops, began forming enormous queues. Sol introduced a new protocol. Only a limited number of bays could be occupied by extended repairs at the same time. Others remained available for routine docking. The repairs continued, but the station no longer allowed a few difficult jobs to disrupt everyone else’s journey.',
                challenge: {
                    prompt: 'How should Meridian Station prevent long repairs from disrupting short visits?',
                    options: ['Allocate bays strictly in arrival order, regardless of how long repairs take.', 'Limit how many bays can be occupied by extended repairs while keeping capacity for normal docking.', 'Prioritize extended repairs so the most demanding ships receive bays first.'],
                    answer: 1,
                    explanation: 'OJP’s adaptive bulkhead helps isolate slow-query workloads from other operations. Long-running work can continue without being allowed to dominate all shared connection capacity.',
                    hints: ['The long repairs should continue, but not occupy every bay.', 'Reserve some shared capacity for ships making routine stops.'],
                    wrong: 'Arrival order or priority alone cannot stop extended repairs from monopolizing the station’s bays.'
                }
            }
        ],
        victory: 'Meridian Station became the busiest trading hub in the sector. Its twelve docking bays had not multiplied. The station had simply learned to make every bay count.'
    },
    {
        id: 'heroes', name: 'The Overloaded City', genre: 'Superheroes',
        badge: 'City Defender', palette: ['#4b245b', '#ffbd4a'],
        description: 'Captain Vale rallies the city’s heroes to share their rescue robots.',
        voice: 'A dispatch from the city newsroom',
        acts: [
            {
                title: 'The Day the Bridge Fell',
                story: 'The city’s greatest superheroes were gathered for a celebration when the alarm sounded. The East Bridge had collapsed. Captain Vale rushed to the scene. Dozens of people were trapped, and the rescue teams desperately needed heavy-lifting robots to clear the wreckage. But only four robots were available. Across the city, thirty more sat unused inside superhero headquarters. Every team permanently kept its own robots, even on quiet days. Those robots could not be reassigned to another team’s emergency. Vale stared at the disaster. The city had the equipment to save everyone. It just could not get that equipment where it was needed.',
                challenge: {
                    prompt: 'What would best help the heroes respond to emergencies using the city’s existing robots?',
                    options: ['Give each superhero team a larger permanent robot allocation.', 'Establish a shared citywide robot fleet that can support whichever teams need help.', 'Keep robots permanently assigned but schedule more frequent transfers between headquarters.'],
                    answer: 1,
                    explanation: 'Traditional application-side pools may hold connections independently, even when they are idle. OJP allows participating applications to share centrally managed backend connection capacity.',
                    hints: ['Robots sit unused at headquarters while another team is in an emergency.', 'A shared citywide fleet can move capacity to the teams that need it.'],
                    wrong: 'Larger permanent allocations and occasional transfers keep resources divided instead of coordinating them as emergencies happen.'
                }
            },
            {
                title: 'The Hero Dispatch Network',
                story: 'Captain Vale called an emergency meeting. "From now on, robots belong to the city, not to individual superhero teams." The engineers activated the Hero Dispatch Network. When a rescue mission needed robots, the network assigned available machines. Once the mission ended, those robots returned to the shared fleet. The next emergency was a fire in the western district. Within minutes, robots that had finished helping another team were dispatched to the scene. No headquarters needed to keep a large number of robots waiting for an emergency that might never happen.',
                challenge: {
                    prompt: 'When should Hero Dispatch assign rescue robots to a team?',
                    options: ['At the beginning of every shift, based on the team’s maximum possible demand.', 'As soon as the team registers for potential emergency duty.', 'When a real rescue mission requires them.'],
                    answer: 2,
                    explanation: 'OJP’s just-in-time connection acquisition means backend database connections can be obtained when operations require them, rather than being reserved for idle logical connections.',
                    hints: ['A team should receive robots for an active mission, not a possible future emergency.', 'Assign them when rescue work actually requires them.'],
                    wrong: 'Allocating robots for potential work strands machines that another active rescue could use.'
                }
            },
            {
                title: 'The Rescue That Wouldn’t End',
                story: 'A powerful earthquake struck the mountain district. Rescuing people from collapsed tunnels required robots to work continuously for hours. The mission commander requested more and more machines. Soon, almost the entire rescue fleet was working in the mountains. Then an apartment fire broke out downtown. For a moment, nobody could send help. Vale changed the dispatch rules. Long-running rescue operations could use only a limited portion of the robot fleet at once. The mountain rescue continued, but enough robots remained available for shorter emergencies elsewhere.',
                challenge: {
                    prompt: 'How can Hero Dispatch protect ordinary emergencies while supporting long-running rescue missions?',
                    options: ['Limit how many robots extended missions can occupy simultaneously.', 'Allocate robots to missions exclusively in the order requests arrive.', 'Give extended missions priority until all their requests have been fulfilled.'],
                    answer: 0,
                    explanation: 'OJP’s adaptive bulkhead can separate slow-query workloads from other database operations, helping prevent long-running queries from monopolizing connection resources.',
                    hints: ['The mountain rescue can continue without using the whole fleet.', 'Limit the share committed to extended missions so other emergencies still have robots.'],
                    wrong: 'Serving long missions first or without limits can leave no robots available for short, urgent rescues.'
                }
            }
        ],
        victory: 'The city survived two disasters on the same day. Not because its superheroes had become stronger, but because they learned to share their strength intelligently.'
    },
    {
        id: 'gaming', name: 'The Resource Dungeon', genre: 'Video games & RPG',
        badge: 'Resource Master', palette: ['#263450', '#85e27d'],
        description: 'Nia and the guilds open a shared armory for their adventuring parties.',
        voice: 'A party journal, annotated between levels',
        acts: [
            {
                title: 'The Empty Armory',
                story: 'Nia’s guild had reached the entrance to the Shadow Dungeon. The final boss awaited inside. There was just one problem: her team had no enchanted weapons. The kingdom owned forty magical weapons, but every one had been assigned permanently to a guild. Many were sitting unused in guild halls while their owners rested. Nia had trained for weeks. Her party was ready, yet no guild would lend its equipment. The Shadow Dungeon was not the real challenge. The kingdom had powerful weapons. It simply had no way to share them.',
                challenge: {
                    prompt: 'How can the guilds make better use of their limited enchanted weapons?',
                    options: ['Give the strongest guilds larger permanent collections.', 'Allow guild leaders to negotiate weapon loans individually whenever another party is short.', 'Establish a shared armory that lends available weapons to active adventuring parties.'],
                    answer: 2,
                    explanation: 'When each application maintains a separate connection pool, connections can remain idle in one pool while another application needs capacity. OJP offers centralized pooling to coordinate connection usage across applications.',
                    hints: ['Weapons are idle in some guild halls while Nia’s party has none.', 'A shared armory coordinates the limited supply for active parties.'],
                    wrong: 'More permanent allocations or one-off negotiations keep the weapons divided among guilds instead of creating shared access.'
                }
            },
            {
                title: 'The Guildmaster’s Agreement',
                story: 'Nia gathered the guildmasters around the great stone table. "We don’t need more weapons. We need to stop locking them away." After hours of arguing, the guildmasters agreed to establish a shared armory. A party could borrow enchanted weapons when it entered a dungeon. When the adventure ended, the weapons would be returned for others to use. Soon, guilds that had once competed over equipment began helping each other. The armory was still limited to forty weapons, but far fewer sat unused.',
                challenge: {
                    prompt: 'When should a party receive weapons from the shared armory?',
                    options: ['When its members join a guild, whether or not they are adventuring.', 'When the party is ready to begin an adventure that requires them.', 'When the party first announces that it may attempt a dungeon later.'],
                    answer: 1,
                    explanation: 'OJP supports acquiring backend database connections when actual work requires them. This avoids tying up physical database connections unnecessarily while application-side logical connections are idle.',
                    hints: ['A weapon should go to a party that is ready to use it.', 'Wait until the adventure begins rather than reserving weapons in advance.'],
                    wrong: 'Giving out weapons before a party is adventuring ties up the shared armory while the equipment is idle.'
                }
            },
            {
                title: 'The Endless Boss Battle',
                story: 'A legendary boss appeared beneath the Black Mountain. Fighting it required powerful enchanted weapons, and the battle lasted for days. More parties joined the fight, taking more weapons from the shared armory. Soon, almost nothing remained for ordinary adventures. Nia realized that a single quest could consume the resources of the entire kingdom. She introduced a new guild rule: long-running boss battles could borrow only a limited number of weapons at once. The battle continued, but smaller parties could still explore, trade, and defend their villages.',
                challenge: {
                    prompt: 'How should the guilds prevent one difficult boss battle from consuming the entire armory?',
                    options: ['Give legendary boss battles first claim on every available weapon.', 'Lend weapons in the order parties arrive, regardless of how long they keep them.', 'Limit how many weapons long-running battles can borrow at once.'],
                    answer: 2,
                    explanation: 'Adaptive bulkhead protection can limit interference from slow-query workloads, preserving shared connection capacity for other requests without accelerating the slow work.',
                    hints: ['The long battle can continue without taking almost every weapon.', 'Cap the share held by long-running battles to preserve weapons for other adventures.'],
                    wrong: 'Prioritizing the long battle or ignoring how many weapons it holds can leave ordinary parties without equipment.'
                }
            }
        ],
        victory: 'Nia defeated the Shadow Dungeon’s final boss. But her greatest achievement was something no legendary weapon could provide: a kingdom where every adventurer had a fair chance to fight.'
    },
    {
        id: 'anime', name: 'The Synchronization Trials', genre: 'Anime-inspired adventure',
        badge: 'Synchronization Master', palette: ['#472766', '#ff6b91'],
        description: 'Akira and rival dojos learn that sharing training machines makes them stronger.',
        voice: 'A spirited training-ground chronicle',
        acts: [
            {
                title: 'The Tournament of Champions',
                story: 'The annual Champions Tournament was only hours away. Akira had trained for this moment his entire life. But when his team arrived at the academy, every advanced training machine was marked unavailable. Through the glass walls, Akira could see several machines sitting completely unused. They belonged to rival dojos, each of which had reserved machines for the entire day, whether their fighters were training or not. "How can we become champions if we cannot even train?" Akira demanded. Master Ren studied the schedule. "The problem isn’t the machines, Akira. It’s how we’ve divided them."',
                challenge: {
                    prompt: 'What would allow more fighters to use the academy’s existing training machines?',
                    options: ['Give the largest dojos permanent priority over more machines.', 'Create a shared reservation system where all dojos can use available machines.', 'Ask dojos to exchange unused reservations at the end of each day.'],
                    answer: 1,
                    explanation: 'Independent application pools can hold database connections while idle, making capacity unavailable to other applications. OJP centralizes pooling so participating applications can share managed database connections.',
                    hints: ['Machines are sitting unused because their reservations belong to other dojos.', 'Share access to available machines across the academy.'],
                    wrong: 'Permanent priority or exchanges after the day ends do not make idle machines available when fighters need them.'
                }
            },
            {
                title: 'The Synchronization Technique',
                story: 'Master Ren gathered the rival dojo leaders. "Power means nothing when it is left unused." He proposed a new system. Instead of keeping training machines reserved all day, each dojo would request equipment when a fighter was ready to begin. When training finished, the machine became available to the next fighter. At first, the rivals resisted. But by sunset, more students had completed their training than on any previous day. Akira smiled as the final machine became available. For the first time, the academy was training as one.',
                challenge: {
                    prompt: 'When should the academy assign a training machine to a fighter?',
                    options: ['When the fighter is ready to start a training session.', 'At the beginning of the day, based on how many fighters each dojo has.', 'When a fighter registers for the tournament, even before training is scheduled.'],
                    answer: 0,
                    explanation: 'OJP supports just-in-time backend connection acquisition. Physical database connections are obtained when operations require them, rather than being permanently reserved for idle logical connections.',
                    hints: ['The machine is needed when the fighter is ready to train.', 'Avoid reserving equipment for a whole day or an unscheduled session.'],
                    wrong: 'Reserving a machine before training is ready can leave it idle while another fighter needs it.'
                }
            },
            {
                title: 'The Thousand-Strike Challenge',
                story: 'The final tournament trial began. One elite team attempted the legendary Thousand-Strike Challenge, an endurance test that could continue for hours. The team occupied more and more training machines. Soon, ordinary fighters couldn’t complete even their shortest exercises. Akira approached Master Ren. "We cannot stop their challenge. But we cannot let their training stop everyone else’s." Ren established separate limits for endurance training. The elite fighters continued their trial, while enough machines remained available for shorter sessions. Akira finally understood. True strength was not taking every resource available. It was knowing how to use power without holding everyone else back.',
                challenge: {
                    prompt: 'How can the academy support endurance training without disrupting everyone else?',
                    options: ['Let endurance teams claim machines until their entire program is complete.', 'Serve training requests strictly in arrival order, regardless of session duration.', 'Limit how many machines extended sessions can occupy simultaneously.'],
                    answer: 2,
                    explanation: 'OJP’s adaptive bulkhead can segregate slow-query workloads, reducing their interference with shorter operations. It protects shared capacity without making slow queries execute faster.',
                    hints: ['The endurance test can continue while short sessions keep access to machines.', 'Limit the machines held by extended sessions at one time.'],
                    wrong: 'Unlimited access or arrival order alone can let endurance sessions occupy the machines short exercises need.'
                }
            }
        ],
        victory: 'Akira entered the Champions Tournament ready for battle. But the lesson he carried was greater than any fighting technique: even rivals can become stronger when they learn to share.'
    },
    {
        id: 'mystery', name: 'The Case of the Missing Connections', genre: 'Mystery & detective',
        badge: 'Master Investigator', palette: ['#242c3d', '#d3b06b'],
        description: 'Detective Rowan traces why busy applications cannot use idle connections.',
        voice: 'Case notes from Detective Rowan',
        acts: [
            {
                title: 'The Connections That Vanished',
                story: 'At 2:17 a.m., Detective Rowan received an unusual call. "Our applications are failing to obtain database connections. But the database isn’t doing much work!" Rowan examined the evidence. The database permitted sixty connections, and all sixty were open. Three applications maintained separate pools of twenty connections each. Two applications had several idle connections. The third was overwhelmed with requests, but its pool had already reached its limit. Rowan found the missing capacity. The connections hadn’t vanished. They were sitting idle inside pools that other applications couldn’t use.',
                challenge: {
                    prompt: 'Why can the busy application run out of connections while other connections remain idle?',
                    options: ['Each application’s pool manages its own reserved connections, which the busy application cannot automatically borrow.', 'The database distributes connections equally between applications regardless of their configured pools.', 'Idle connections in other pools automatically become available once a busy application reaches its pool limit.'],
                    answer: 0,
                    explanation: 'Independent JDBC pools can hold backend connections that other application instances cannot borrow. OJP uses server-managed pooling to coordinate database connection capacity across participating applications.',
                    hints: ['The idle connections belong to pools managed separately from the busy application.', 'Look for isolated reservations that the busy pool cannot borrow.'],
                    wrong: 'A busy application cannot automatically borrow connections reserved by a separate pool; the database does not redistribute them.'
                }
            },
            {
                title: 'The Shared Connection',
                story: 'Rowan had a theory. "What if the applications stopped managing their database connections separately?" The engineering team introduced a shared connection service. Instead of each application holding its own collection of database sessions, the applications accessed centrally managed capacity. A physical database connection was obtained when an operation needed one and could be returned to the shared pool afterward. Rowan watched the monitoring screen. The busy application could now draw from capacity that was previously stranded in the other pools. The database still had the same limit of sixty connections. But the applications no longer had to compete through isolated reservations.',
                challenge: {
                    prompt: 'What is the key advantage of this new architecture?',
                    options: ['Every application receives an unlimited number of database connections.', 'Each application gets a larger private pool, independent of the others.', 'Applications share server-managed capacity, with backend connections acquired when operations need them.'],
                    answer: 2,
                    explanation: 'OJP uses a JDBC Type 3 driver that communicates with OJP servers. Those servers manage backend connection pools and support just-in-time acquisition, helping participating application instances share finite database capacity.',
                    hints: ['The database still has a fixed limit; what changed is who manages the capacity.', 'Choose the option that combines shared server management and acquisition for actual work.'],
                    wrong: 'The architecture coordinates a finite pool; it does not create unlimited capacity or larger isolated pools.'
                }
            },
            {
                title: 'The Query That Held Everyone Hostage',
                story: 'Just when Rowan thought the case was closed, another alarm sounded. Short database requests were suddenly taking far too long. Rowan investigated the monitoring data and discovered the culprit: several complex analytical queries were occupying connections for extended periods. The queries were legitimate. They simply took much longer than ordinary transactions. If too many ran simultaneously, short requests were left waiting. The engineers introduced protection that separated the slow workload from ordinary database operations. The analytical queries continued, but could no longer dominate all shared capacity. Rowan closed the case. The mystery had never been about missing connections. It was about how those connections were managed.',
                challenge: {
                    prompt: 'What best protects short database operations when analytical queries run for a long time?',
                    options: ['Give every analytical query priority because it has already been running longer.', 'Isolate slow workloads so they cannot monopolize shared connection resources.', 'Increase the timeout for short operations so they can wait behind analytical queries.'],
                    answer: 1,
                    explanation: 'OJP’s adaptive bulkhead can separate slow-query workloads from other operations, reducing resource contention. It doesn’t accelerate analytical queries; it helps protect unrelated work from their effects.',
                    hints: ['The analytical queries are legitimate, but should not consume all shared capacity.', 'Separate or limit the slow workload rather than prioritizing it or making others wait longer.'],
                    wrong: 'Giving slow queries priority or extending other requests’ wait does not protect the capacity they need.'
                }
            }
        ],
        victory: 'Rowan’s final report contained just one sentence: "The connections were never missing. The architecture was hiding them in plain sight."'
    },
    {
        id: 'racing', name: 'The Racing Academy Bottleneck', genre: 'Racing & sports',
        badge: 'Pit Lane Strategist', palette: ['#402326', '#ff795e'],
        description: 'Imani helps racing teams share simulators and keep practice moving.',
        voice: 'Live commentary from the pit wall',
        acts: [
            {
                title: 'The Qualifying Disaster',
                story: 'Imani had one hour left before the academy’s championship qualifiers. She needed to practice the circuit’s most difficult corner. But every racing simulator was marked unavailable. The academy owned twelve simulators. Three racing teams each had four reserved for the entire day. Imani looked through the training-room windows. Five simulators were sitting empty. Their teams had finished training hours ago, but their reservations remained active. "Five empty machines, and I can’t use a single one?" Her coach nodded. "The equipment isn’t the problem, Imani. It’s the reservation system."',
                challenge: {
                    prompt: 'What should the racing academy change to use its existing simulators more effectively?',
                    options: ['Reserve more simulator time for whichever team has the most championship points.', 'Keep team reservations fixed but let coaches negotiate exchanges when equipment is idle.', 'Allow all teams to access a shared simulator pool instead of permanently dividing the machines.'],
                    answer: 2,
                    explanation: 'Separate application connection pools can reserve database connections independently, even when some connections are idle. OJP centralizes pooling to let participating applications share finite backend capacity.',
                    hints: ['Some machines are idle, but their reservations prevent other teams from using them.', 'Replace permanently divided access with a shared pool.'],
                    wrong: 'More reservations or occasional manual exchanges leave the academy reacting to stranded capacity instead of sharing it.'
                }
            },
            {
                title: 'The Perfect Pit Strategy',
                story: 'The academy introduced a new scheduling system. Teams no longer controlled particular simulators for an entire day. Instead, drivers requested a simulator when they were ready for a training session. When the session ended, the machine returned to the available pool. Imani watched the schedule change in real time. A driver finished practicing the final sector. Minutes later, another driver took the same machine. There were no new simulators and no longer training days. Just fewer machines sitting unused. Imani finally completed her practice laps before qualifying.',
                challenge: {
                    prompt: 'When should the academy allocate a simulator to a driver?',
                    options: ['At the start of the racing season, based on expected demand.', 'When the driver is ready to begin a training session.', 'At the start of each race week, based on the team’s planned maximum usage.'],
                    answer: 1,
                    explanation: 'OJP can acquire physical database connections when operations actually need them. This avoids unnecessarily holding backend capacity for application-side logical connections that are currently idle.',
                    hints: ['A driver should get a machine when it is time to practice.', 'Avoid season-long or week-long reservations for sessions that have not started.'],
                    wrong: 'Scheduling based on forecasts reserves simulators before the work is ready and can leave them idle.'
                }
            },
            {
                title: 'The Endurance Simulation',
                story: 'Championship week brought a new challenge. Several teams began running twelve-hour endurance simulations. These sessions occupied machines for much longer than ordinary practice laps. Soon, drivers who needed only fifteen minutes to test a setup couldn’t find an available simulator. Imani proposed a solution. The academy would limit how many simulators could be occupied by endurance sessions at one time. Long sessions continued, but shorter training exercises retained access to the remaining machines. As the championship began, the academy was busier than ever. Yet the training queues were finally manageable.',
                challenge: {
                    prompt: 'How can the academy prevent endurance sessions from blocking shorter training activities?',
                    options: ['Restrict the number of simulators available to long sessions so shorter sessions retain capacity.', 'Always assign simulators to the longest sessions first, reducing the backlog of demanding work.', 'Allocate simulators strictly by booking order, without distinguishing long and short sessions.'],
                    answer: 0,
                    explanation: 'Adaptive bulkheads can segregate slow-query workloads to help preserve connection capacity for shorter database operations. They don’t make long-running operations finish sooner.',
                    hints: ['Long simulations can continue while short practice sessions keep access to machines.', 'Set a limit on the simulators long sessions can occupy at once.'],
                    wrong: 'Serving the longest sessions first or ignoring their duration does not preserve machines for short training.'
                }
            }
        ],
        victory: 'Imani crossed the finish line in first place. Her winning advantage wasn’t a faster car. It was a training system that finally gave every driver access to the resources they needed.'
    },
    {
        id: 'engineering', name: 'The Connection Budget', genre: 'Engineering reality',
        badge: 'Connection Architect', palette: ['#153b59', '#55c8a8'],
        description: 'A production team coordinates replica pools against a finite database connection budget.',
        voice: 'An incident review from the platform team',
        acts: [
            {
                title: 'The Deployment That Broke the Database',
                story: 'At 09:14, a deployment doubled the application’s replicas from five to ten. Traffic was growing, and additional replicas should have increased the application’s capacity. Instead, users began reporting connection timeouts. The database allowed a maximum of 100 application connections. Each replica had its own JDBC connection pool configured with a maximum of 20 connections. Before the deployment, the combined pool maximums totaled 100. After scaling, they totaled 200. That didn’t mean 200 connections were immediately opened. But the application could now attempt to use twice the database’s capacity, and idle connections held by one replica weren’t automatically available to another. The team had scaled the application without coordinating its connection budget.',
                challenge: {
                    prompt: 'Why can adding application replicas create database connection pressure?',
                    options: ['Every new replica makes the database automatically increase its maximum connection limit.', 'Each replica independently manages its pool, so combined potential demand can exceed the database’s fixed connection budget.', 'Adding replicas divides the database’s existing sessions equally among the new instances without requiring coordination.'],
                    answer: 1,
                    explanation: 'With independent application-side pools, the total configured connection capacity can grow as replicas increase. OJP provides centralized backend pooling, allowing database connection capacity to be managed across participating application instances.',
                    hints: ['Compare the sum of pool maximums with the database’s fixed limit.', 'A replica’s own pool does not automatically coordinate with every other replica.'],
                    wrong: 'The database limit does not grow with application replicas, and the database does not automatically redistribute sessions among pools.'
                }
            },
            {
                title: 'Moving the Pool',
                story: 'The engineers considered increasing the database’s connection limit. But that would only postpone the architectural problem. Instead, they introduced Open J Proxy. Each application replica used the OJP JDBC Type 3 driver, communicating with OJP servers that managed the backend database connections. The application could obtain a logical JDBC connection without immediately reserving a physical database session. When an operation needed database access, OJP acquired backend capacity from its managed pool. When that work no longer required the connection, the capacity could be reused. Ten application replicas no longer needed ten independently managed backend pools. The database limit remained unchanged, but connection usage was coordinated.',
                challenge: {
                    prompt: 'What changes when an application uses OJP’s centralized pooling and just-in-time acquisition?',
                    options: ['Backend connections are managed by OJP servers and can be acquired when operations need database access.', 'Every application replica continues maintaining its own independent backend connection pool with the same reservation behavior.', 'The database automatically accepts more physical connections than its configured limit.'],
                    answer: 0,
                    explanation: 'OJP separates application-side logical JDBC connections from centrally managed backend database connections. Its server-side pooling and just-in-time acquisition can reduce unnecessary reservations and improve resource coordination.',
                    hints: ['The database limit stays fixed; OJP changes where backend connection management happens.', 'Look for server-managed pools that acquire a physical connection for actual work.'],
                    wrong: 'OJP does not raise the database limit or retain the same independent backend-pool arrangement at every replica.'
                }
            },
            {
                title: 'The Slow Query Incident',
                story: 'Two weeks later, the application faced another production incident. A reporting workload began executing complex analytical queries. Some queries ran for minutes, occupying backend connections while short transactional requests waited. The database wasn’t offline. The reporting queries weren’t necessarily defective. The problem was resource contention. The engineers enabled OJP’s adaptive bulkhead capabilities to segregate slow-query workloads and protect capacity for other operations. They also reviewed their multi-server OJP configuration so clients could use available servers if one failed, while recognizing that in-flight operations might still be interrupted. Monitoring made the remaining connection pressure visible. The team had learned that scaling was only half the challenge. The other half was controlling how shared resources were used.',
                challenge: {
                    prompt: 'Which approach best protects transactional operations during a surge of long-running analytical queries?',
                    options: ['Increase all query timeouts so transactional requests can remain queued longer.', 'Give analytical queries access to all available connections to complete the reporting workload first.', 'Segregate slow queries to limit their interference with short operations, while managing the shared connection budget.'],
                    answer: 2,
                    explanation: 'OJP’s adaptive bulkhead can protect shared capacity from slow-query interference. Client-side high availability can use configured OJP servers, although operations already in flight may still fail during an outage. Neither capability removes database limits.',
                    hints: ['Protect the transactional workload without claiming the analytical queries become faster.', 'Segregate slow work and keep managing the finite shared connection budget.'],
                    wrong: 'Longer waits or unrestricted analytical access do not protect transactional capacity or remove the database’s limits.'
                }
            }
        ],
        victory: 'The next scaling deployment completed without the same connection-budget incident. The team hadn’t made the database limitless. They had made connection management deliberate, observable, and coordinated.'
    }
];

function prepareWorlds(worlds, questId, objectives, hintText) {
    return worlds.map(world => ({
        ...world,
        questId,
        acts: world.acts.map((act, index) => ({
            ...act,
            challenge: {
                ...act.challenge,
                hints: act.challenge.hints || [
                    `Think about the main idea: ${objectives[index].title.toLowerCase()}.`,
                    hintText
                ],
                wrong: act.challenge.wrong || 'Revisit the story and consider the technical explanation before trying again.'
            }
        }))
    }));
}

export const QUESTS = [
    {
        id: 'connection-crisis',
        title: 'The Connection Crisis',
        description: 'Learn how shared pooling, just-in-time connections, and workload isolation help applications use database capacity.',
        centralMessage: 'Coordinate finite database connections instead of reserving them independently.',
        objectives: CONNECTION_CRISIS_OBJECTIVES,
        worlds: prepareWorlds(
            CONNECTION_CRISIS_WORLDS,
            'connection-crisis',
            CONNECTION_CRISIS_OBJECTIVES,
            'Look for the answer that shares capacity, acquires it for real work, or protects it from long-running workloads.'
        ),
        reveal: {
            title: 'The Connection Crisis',
            intro: 'You uncovered three ideas for managing limited database connections:',
            points: [
                'Share resources intelligently. Independent application pools can reserve database connections that other applications need.',
                'Acquire resources when needed. Idle application-side connections do not always need to hold physical database connections.',
                'Protect shared capacity. Slow operations should not be allowed to monopolize connections needed by other workloads.'
            ],
            closing: 'Open J Proxy uses a JDBC Type 3 driver and server-managed database connection pools to help applications coordinate and control how they use finite database capacity.'
        }
    },
    {
        id: 'floodgate-protocol',
        title: 'The Floodgate Protocol',
        description: 'Learn how client-side reactive throttling prevents overload and allows controlled recovery.',
        centralMessage: 'Sometimes the best way to protect a system is to stop excess requests before they reach it.',
        references: [{
            label: 'Read OJP client-throttling documentation',
            url: 'https://github.com/Open-J-Proxy/ojp/blob/main/documents/ebook/part3-chapter8a-client-throttling.md'
        }],
        objectives: [
            { id: 'floodgate-overload', title: 'Recognize overload' },
            { id: 'floodgate-client-throttling', title: 'Limit requests before transmission' },
            { id: 'floodgate-adaptive-recovery', title: 'Recover concurrency gradually' }
        ],
        worlds: prepareWorlds(
            FLOODGATE_WORLDS,
            'floodgate-protocol',
            [
                { title: 'Recognize overload' },
                { title: 'Limit requests before transmission' },
                { title: 'Recover concurrency gradually' }
            ],
            'Choose the response that limits outgoing work before transmission and adapts as pressure changes.'
        ),
        reveal: {
            title: 'YOU HAVE MASTERED THE FLOODGATE PROTOCOL.',
            intro: 'A database system has limited capacity. When demand exceeds that capacity, more incoming requests can make performance worse rather than better.',
            points: [
                'The server monitors capacity and overload.',
                'The JDBC driver adapts how much work it sends.',
                'Excess attempts can be rejected locally before transmission.',
                'Concurrency limits recover gradually as conditions improve.'
            ],
            closing: 'This is one of the distinguishing capabilities of OJP’s Type 3 architecture: control exists on both sides of the network. It does not eliminate overload errors. It allows applications to respond to them closer to their source.'
        }
    },
    {
        id: 'database-freedom',
        title: 'The Database Freedom Quest',
        description: 'Learn how database-agnostic connectivity reduces infrastructure coupling without promising universal SQL portability.',
        centralMessage: 'Your architecture should not become unnecessarily dependent on one database vendor, proxy technology, or cloud provider.',
        objectives: [
            { id: 'database-freedom-fragmentation', title: 'Identify connectivity fragmentation' },
            { id: 'database-freedom-common-layer', title: 'Use a common connectivity layer' },
            { id: 'database-freedom-responsibility', title: 'Understand portability responsibilities' }
        ],
        worlds: prepareWorlds(
            DATABASE_FREEDOM_WORLDS,
            'database-freedom',
            [
                { title: 'Identify connectivity fragmentation' },
                { title: 'Use a common connectivity layer' },
                { title: 'Understand portability responsibilities' }
            ],
            'Choose the answer that separates common connection management from database-specific behavior.'
        ),
        reveal: {
            title: "YOU'VE COMPLETED THE DATABASE FREEDOM QUEST.",
            intro: 'Architectural freedom does not mean that every technology behaves identically. It means making deliberate choices about which parts of your system need to depend on a particular technology.',
            points: [
                'Open J Proxy separates a significant part of database connection management from the underlying database engine.',
                'Its JDBC Type 3 driver and server-side architecture can provide a consistent connectivity layer across supported databases, using appropriate JDBC drivers.',
                'This can reduce the need to maintain separate database-specific proxy infrastructures and make the architecture more portable between environments.'
            ],
            closing: 'OJP does not automatically translate SQL, migrate databases, or eliminate the operational responsibility of running a connectivity service. TRUE ARCHITECTURAL FREEDOM IS NOT THE ABSENCE OF DEPENDENCIES. IT IS CONTROL OVER WHICH DEPENDENCIES YOU ACCEPT.'
        }
    }
];

export const OBJECTIVES = QUESTS.flatMap(quest => quest.objectives.map(objective => ({
    ...objective,
    questId: quest.id
})));

export const WORLDS = QUESTS.flatMap(quest => quest.worlds);

export function getQuestById(id) {
    return QUESTS.find(quest => quest.id === id);
}

export function getWorldById(id) {
    return WORLDS.find(world => world.id === id);
}

export function getQuestForWorld(worldId) {
    const world = getWorldById(worldId);
    return world ? getQuestById(world.questId) : undefined;
}

export const BADGE_DESCRIPTIONS = Object.fromEntries(WORLDS.map(world => [
    world.id,
    `${world.badge}, awarded for completing ${world.name}.`
]));
