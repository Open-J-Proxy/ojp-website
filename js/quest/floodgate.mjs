export const FLOODGATE_WORLDS = [
    {
        id: 'floodgate-fantasy', name: 'The Siege of the Crystal Tower', genre: 'Epic fantasy',
        badge: 'Guardian of the Floodgates', icon: 'fantasy', palette: ['#244c3b', '#8ee2c0'],
        description: 'The kingdom learns how to protect its tower from a flood of requests.',
        voice: 'A chronicle from the Crystal Tower',
        acts: [
            {
                title: 'A Thousand Pleas for Help',
                story: 'The Crystal Tower protected every village in the kingdom. When danger approached, village guardians sent magical requests to its sorcerers. But the tower could process only a limited number of spells at once. One morning, a great storm swept across the land. Frightened villages sent hundreds of requests simultaneously. Those receiving no response sent them again, filling the tower’s waiting hall with even more pleas. Soon, the sorcerers were overwhelmed. Even important requests struggled to reach them.',
                challenge: {
                    prompt: 'What is making the crisis worse?',
                    options: ['The villages are too far away from the tower.', 'Villages keep sending more requests than the tower can handle, including repeated attempts.', 'The sorcerers are not accepting enough apprentices.'],
                    answer: 1,
                    explanation: 'When an OJP server is saturated, excessive requests can accumulate and time out. Further retries can compound the overload rather than resolve it.'
                }
            },
            {
                title: 'The Warning Crystals',
                story: 'The tower’s master sorcerer devised a warning crystal for every village. When the tower began struggling, its crystals signaled the pressure to the guardians. Each village then limited how many new spell requests it attempted at once. Requests beyond that local limit were refused immediately, giving the village a chance to decide when it was safe to try again. The tower could finally concentrate on the spells already being performed. The guardians had discovered an unusual form of protection: sometimes helping the tower meant sending it less work.',
                challenge: {
                    prompt: 'Where should the new request limits be enforced?',
                    options: ['In each village, before requests are sent to the tower.', 'Only inside the tower, after all requests have arrived.', 'At a separate waiting hall built outside the tower.'],
                    answer: 0,
                    explanation: 'OJP’s JDBC driver can reject excess concurrent requests locally using limits informed by server feedback. This prevents those requests from adding further pressure to the server.'
                }
            },
            {
                title: 'The Calm After the Storm',
                story: 'By evening, the storm began to weaken. One village noticed that the tower was responding quickly again and wanted to send all its waiting requests at once. But the master sorcerer warned against it. If every village suddenly resumed at full speed, the tower could become overwhelmed again. Instead, the guardians restored their sending limits gradually as the tower recovered. When another burst of pressure appeared, they tightened the limits again. The kingdom had learned that safety required both restraint and a careful return to normal.',
                challenge: {
                    prompt: 'What is the safest way to restore request volume after an overload?',
                    options: ['Immediately remove all limits when the first request succeeds.', 'Keep the reduced limits permanently, even after full recovery.', 'Increase the limits gradually and reduce them again when overload is detected.'],
                    answer: 2,
                    explanation: 'OJP’s reactive throttling adapts to pressure, reducing permitted concurrency after overload and recovering gradually rather than allowing an immediate uncontrolled burst.'
                }
            }
        ],
        victory: 'The Crystal Tower survived not because it learned to cast more spells, but because the kingdom learned when to ask for them.'
    },
    {
        id: 'floodgate-space', name: 'The Last Transmission', genre: 'Space exploration',
        badge: 'Galactic Traffic Controller', icon: 'space', palette: ['#10284a', '#46d9e8'],
        description: 'Commander Sol coordinates a fleet when its relay comes under pressure.',
        voice: 'A transmission from Meridian Relay',
        acts: [
            {
                title: 'The Relay Collapse',
                story: 'The exploration fleet depended on Meridian Relay to exchange navigation calculations. The relay could process a limited number of calculations simultaneously. During an asteroid storm, dozens of ships requested emergency route updates. Their computers repeatedly sent new calculations while earlier ones were still processing. Meridian’s workload surged. Requests began timing out. Some ships immediately retried, creating another wave of traffic. Commander Sol watched the relay’s status deteriorate. The fleet was attempting to escape the storm, but its own computers were making coordination harder.',
                challenge: {
                    prompt: 'Why are the relay’s delays getting worse?',
                    options: ['Ships are submitting calculations faster than the relay can process them, including additional retries.', 'The relay needs every ship to send requests simultaneously to remain efficient.', 'The fleet has too few ships to distribute the requests evenly.'],
                    answer: 0,
                    explanation: 'Excess concurrent database operations and repeated retries can worsen an overloaded server’s response times and timeout rate.'
                }
            },
            {
                title: 'The Onboard Governor',
                story: 'Sol activated a new communications protocol. Meridian Relay could now report when its processing capacity was under pressure. Each ship’s computer used that information to limit its own outgoing calculations. If too many calculations were already in progress, the ship rejected additional submission attempts locally rather than sending them into the congested relay. The ship’s navigation software had to decide whether and when to submit them again. For the first time, the relay was no longer the only system responsible for protecting itself.',
                challenge: {
                    prompt: 'What makes the new protocol different?',
                    options: ['The relay gains additional processing capacity.', 'The relay processes every excess request in a longer queue.', 'Ships control their own request concurrency using pressure information from the relay.'],
                    answer: 2,
                    explanation: 'OJP coordinates its JDBC client and server. Server pressure signals influence limits enforced inside the client driver, before requests are transmitted.'
                }
            },
            {
                title: 'The Second Wave',
                story: 'The storm passed, and Meridian’s processing time returned to normal. Several captains wanted to restore maximum transmission rates immediately. Sol refused. The computers cautiously increased the number of simultaneous calculations allowed. Each successful period of operation provided more confidence. When another asteroid wave struck, the system tightened its limits. The fleet could now respond to changing conditions rather than relying on one fixed sending rate.',
                challenge: {
                    prompt: 'Why should the ships restore capacity gradually?',
                    options: ['Because the relay’s physical capacity permanently decreases after every overload.', 'Because a sudden fleet-wide burst could recreate the overload.', 'Because every ship must wait for all others to finish before sending anything.'],
                    answer: 1,
                    explanation: 'Adaptive throttling reduces concurrency under pressure and increases permitted load progressively during recovery, helping avoid a new overload surge.'
                }
            }
        ],
        victory: 'Meridian Relay remained online through the final wave. The fleet had learned that coordination begins before a message is transmitted.'
    },
    {
        id: 'floodgate-heroes', name: 'The City That Called for Help Too Often', genre: 'Superheroes',
        badge: 'Guardian of City Control', icon: 'heroes', palette: ['#4b245b', '#ffbd4a'],
        description: 'Captain Vale helps City Control recover from a flood of rescue commands.',
        voice: 'A dispatch from City Control',
        acts: [
            {
                title: 'The Command Center Crisis',
                story: 'A giant machine malfunctioned in the city center. Captain Vale deployed the city’s rescue robots, while superhero teams across the city began submitting commands through City Control. But City Control could process only a limited number of commands simultaneously. As teams lost patience waiting for responses, their computers repeatedly submitted additional commands. Soon, the command center was overwhelmed with incoming traffic. A hero requested a robot to clear a fallen wall, but the command system struggled to respond. The robots were ready. The overloaded control system was the problem.',
                challenge: {
                    prompt: 'What is the immediate problem at City Control?',
                    options: ['There are too few superhero teams.', 'The rescue robots are all physically damaged.', 'Too many simultaneous command requests and retries are overloading the system.'],
                    answer: 2,
                    explanation: 'An overloaded OJP server may experience admission waits and timeouts. Allowing clients to continue submitting excessive requests can amplify the problem.'
                }
            },
            {
                title: 'A Shield at Every Headquarters',
                story: 'Vale ordered the engineers to install a command governor at every superhero headquarters. The central system reported when its processing capacity was under pressure. Each headquarters then controlled how many robot commands it could submit simultaneously. When its local limit was reached, a new command attempt was declined immediately instead of adding to the central overload. Teams had to handle those refusals safely, including deciding which commands could be retried. City Control began recovering because the headquarters were finally helping protect it.',
                challenge: {
                    prompt: 'Why is controlling commands at each headquarters useful?',
                    options: ['It prevents excess requests from reaching an already struggling command center.', 'It allows every headquarters to issue unlimited commands without affecting City Control.', 'It guarantees that every rescue operation succeeds without delay.'],
                    answer: 0,
                    explanation: 'Client-side throttling rejects excess attempts in the OJP JDBC driver. It reduces server pressure, but applications must still handle those failures appropriately.'
                }
            },
            {
                title: 'The Heroes Return to Action',
                story: 'The giant machine was finally disabled. Command traffic dropped, and City Control began responding normally. One superhero team proposed disabling all command limits immediately. Vale disagreed. “If every headquarters rushes back at full power, we’ll create the same disaster again.” The command governors slowly increased their permitted concurrency as the system recovered. When another surge briefly appeared, they reduced it again. The city hadn’t gained a more powerful command center. It had learned how to avoid overwhelming the one it had.',
                challenge: {
                    prompt: 'What should the command governors do as the system recovers?',
                    options: ['Stay permanently at their lowest limits.', 'Increase permitted concurrency gradually while responding to new pressure.', 'Immediately allow unlimited commands from every headquarters.'],
                    answer: 1,
                    explanation: 'OJP’s reactive throttling adjusts to changing conditions, using overload feedback to reduce concurrency and gradual recovery to avoid renewed bursts.'
                }
            }
        ],
        victory: 'Captain Vale saved the city with a lesson few superheroes expected: knowing when to hold back can be as important as knowing when to act.'
    },
    {
        id: 'floodgate-gaming', name: 'The Portal Overload', genre: 'Gaming & RPG',
        badge: 'Portal Guardian', icon: 'gaming', palette: ['#263450', '#85e27d'],
        description: 'Nia and the guilds protect a busy portal by controlling outgoing requests.',
        voice: 'A party journal from Eldoria',
        acts: [
            {
                title: 'The Portal That Stopped Working',
                story: 'The Kingdom of Eldoria had one enchanted portal connecting its cities to the dungeon realms. The portal could prepare only a limited number of journeys simultaneously. When the legendary Dragon Vault opened, adventuring guilds rushed to reserve passage. Some impatient guilds submitted new travel requests every few seconds while their earlier requests were still pending. Soon, the portal’s queue became enormous. Even ordinary travelers struggled to get a response. Nia, leader of the Silver Guild, realized the danger. The portal wasn’t broken. Everyone was demanding more from it than it could provide.',
                challenge: {
                    prompt: 'What is worsening the portal’s congestion?',
                    options: ['The portal connects too many different realms.', 'Ordinary travelers are making journeys that are too short.', 'Guilds are submitting excessive requests and repeating them while the portal is overloaded.'],
                    answer: 2,
                    explanation: 'Repeated requests and retries can intensify overload when the server already has more concurrent work than it can admit.'
                }
            },
            {
                title: 'The Guild Gatekeepers',
                story: 'The portal master sent magical warning stones to every guild. When the portal began struggling, the stones revealed how much pressure it was under. Each guild appointed a gatekeeper to control its outgoing travel requests. If the guild had already reached its permitted number of outstanding requests, additional attempts were refused locally. This gave adventurers an immediate answer instead of making them wait indefinitely for an overloaded portal. Guild leaders could then decide whether to try again later. The portal finally began clearing its backlog.',
                challenge: {
                    prompt: 'What should a guild gatekeeper do when its local request limit is reached?',
                    options: ['Submit the request anyway and ask the portal to reject it.', 'Refuse the excess submission before sending it to the portal.', 'Automatically create another travel request in case the first one is lost.'],
                    answer: 1,
                    explanation: 'OJP’s client-side throttle uses local concurrency tracking. Requests beyond the current limit fail fast instead of being transmitted or silently queued.'
                }
            },
            {
                title: 'The Dragon Vault Reopens',
                story: 'After the first wave of adventurers entered the Dragon Vault, the portal became less congested. The guildmasters celebrated and prepared to remove their limits. Nia stopped them. The Dragon Vault was still attracting new adventurers. If every guild submitted requests at full speed, the portal could become overwhelmed again. The gatekeepers began allowing more requests gradually. Whenever pressure rose, they tightened the limits. The portal remained usable, and the guilds learned to adapt rather than simply rush.',
                challenge: {
                    prompt: 'What makes the gatekeepers’ adaptive approach safer than removing all limits immediately?',
                    options: ['It allows request volume to rise cautiously without triggering another uncontrolled surge.', 'It guarantees every guild receives exactly the same amount of portal capacity.', 'It permanently prevents new adventurers from entering the dungeon.'],
                    answer: 0,
                    explanation: 'Reactive throttling adapts to observed pressure. It is not a strict fairness guarantee; OJP also offers proactive and combined modes for different concurrency-control requirements.'
                }
            }
        ],
        victory: 'The Dragon Vault opened to the adventurers once more. Nia had discovered that even the most powerful portal could be defeated by an uncontrolled crowd.'
    },
    {
        id: 'floodgate-anime', name: 'The Resonance Limit', genre: 'Anime',
        badge: 'Master of Balance', icon: 'anime', palette: ['#66304f', '#f4a8d5'],
        description: 'Akira and Master Ren teach the dojos to respect the arena’s capacity.',
        voice: 'A training journal from the Grand Arena',
        acts: [
            {
                title: 'The Arena Falls Silent',
                story: 'The Grand Arena’s energy core powered training simulations for every dojo. During the Champions Tournament, hundreds of fighters began requesting simulations at once. The core could prepare only a limited number simultaneously. When their simulations were delayed, impatient fighters repeatedly submitted new requests. The arena’s control system became overwhelmed. Akira watched the training screens freeze as more and more competitors demanded access. Master Ren shook his head. “The core has limits. But everyone is behaving as though it has none.”',
                challenge: {
                    prompt: 'Why is the arena’s control system struggling?',
                    options: ['The fighters are producing too much physical energy during training.', 'Too many simulation requests and repeated attempts are arriving simultaneously.', 'The tournament contains too many different fighting styles.'],
                    answer: 1,
                    explanation: 'When concurrent requests exceed a server’s processing capacity, further submissions and retries can aggravate queuing and timeouts.'
                }
            },
            {
                title: 'The Master’s New Discipline',
                story: 'Ren introduced a new training rule. Each dojo would receive a warning signal whenever the arena’s control system was under pressure. The dojo’s training console would then restrict how many simulation requests it could send simultaneously. Attempts beyond the current limit would be refused at the console, rather than transmitted to the already congested arena. The fighters initially complained. But as the control system recovered, simulations began responding again. Akira finally understood the lesson: discipline meant knowing when not to demand more.',
                challenge: {
                    prompt: 'Where should the new restriction take effect?',
                    options: ['At each dojo’s console, before another request reaches the arena.', 'Only after the arena accepts the request into its queue.', 'After every fighter has submitted all their requests.'],
                    answer: 0,
                    explanation: 'OJP’s JDBC driver can enforce a local request-concurrency limit derived from server pressure feedback. Excess attempts are rejected before transmission.'
                }
            },
            {
                title: 'The Return of Power',
                story: 'The arena began recovering. The warning signals weakened, and fighters demanded permission to train at full intensity. Ren refused to remove every limit immediately. “If everyone returns at once, we will repeat our mistake.” Instead, the consoles gradually allowed more concurrent requests as the arena regained capacity. When the control system showed signs of renewed overload, the limits tightened again. By the tournament finals, Akira understood that mastery was not unlimited power. It was control.',
                challenge: {
                    prompt: 'What best describes Ren’s recovery strategy?',
                    options: ['Keep request limits permanently low regardless of performance.', 'Increase all limits to their maximum after one successful simulation.', 'Gradually raise concurrency as conditions improve, reducing it again if pressure returns.'],
                    answer: 2,
                    explanation: 'OJP’s reactive throttling follows adaptive congestion-control principles: it reduces permitted work when overloaded and recovers progressively.'
                }
            }
        ],
        victory: 'Akira won his final match. His greatest technique was not a powerful attack, but the discipline to use only the power the moment could sustain.'
    },
    {
        id: 'floodgate-mystery', name: 'The Midnight Request Storm', genre: 'Mystery',
        badge: 'Overload Investigator', icon: 'mystery', palette: ['#29364f', '#9bc4ff'],
        description: 'Detective Rowan traces cascading timeouts to a request storm.',
        voice: 'An incident report by Detective Rowan',
        acts: [
            {
                title: 'The Server That Wasn’t Broken',
                story: 'At 1:42 a.m., Detective Rowan arrived at a data center experiencing widespread failures. Applications were reporting database timeouts, but the servers were still running. The OJP server had a finite number of slots for concurrent database work. Applications were sending more requests than those slots could accommodate. Some requests waited until they timed out. Their callers then retried, increasing the pressure further. Rowan examined the request logs. The failures weren’t necessarily caused by a crashed database. The system was being overwhelmed by the amount of work arriving.',
                challenge: {
                    prompt: 'What is the likely cause of the cascading timeouts?',
                    options: ['The existence of multiple application instances proves that the database is defective.', 'Every timeout means the OJP server has permanently lost a connection.', 'Excess concurrent work and retries are increasing pressure on an already saturated system.'],
                    answer: 2,
                    explanation: 'OJP’s admission control can limit server-side work, but clients that continue submitting requests may still contribute to overload and timeout cascades.'
                }
            },
            {
                title: 'The Clue Inside the Driver',
                story: 'Rowan examined the OJP JDBC driver. He discovered that the driver could receive information about server capacity and observed overload. When the server reported pressure, the driver adjusted how many requests its application had in flight. A request exceeding that local limit was rejected immediately with an error. It never reached the OJP server. Rowan finally understood the missing piece. The system didn’t have to wait until requests arrived at the server to protect itself. The applications could participate in the protection.',
                challenge: {
                    prompt: 'What is the important difference between client-side throttling and server-side admission control?',
                    options: ['Client-side throttling rejects excess work before transmission, while server-side admission control operates after requests reach the server.', 'Client-side throttling automatically fixes database queries that take too long.', 'Server-side admission control eliminates the need for applications to handle errors.'],
                    answer: 0,
                    explanation: 'OJP combines driver-side throttling with server-side admission control. The driver can fail fast locally; the server remains the final authority over admitted work.'
                }
            },
            {
                title: 'The Recovery Pattern',
                story: 'Rowan reviewed the next hour of metrics. After overload was detected, the clients reduced their concurrency. Requests began completing more reliably. But the system did not return instantly to maximum capacity. As it recovered, the permitted concurrency increased cautiously. When pressure appeared again, the limits tightened. Rowan compared the pattern with a familiar principle from network congestion control. The system was learning to operate within its changing capacity rather than repeatedly overwhelming it.',
                challenge: {
                    prompt: 'Why is gradual recovery preferable to removing the limits immediately?',
                    options: ['Every timeout permanently reduces the database’s configured connection maximum.', 'Gradual increases reduce the risk of renewed overload from simultaneous client bursts.', 'Once clients have been throttled, concurrency should never increase again.'],
                    answer: 1,
                    explanation: 'OJP uses server feedback and adaptive concurrency adjustment. The reactive mode can back off after overload and increase its limits progressively during recovery.'
                }
            }
        ],
        victory: 'Rowan closed the incident with a new finding: the most valuable requests were sometimes the ones the driver chose not to send.'
    },
    {
        id: 'floodgate-racing', name: 'The Telemetry Traffic Jam', genre: 'Racing',
        badge: 'Telemetry Strategist', icon: 'racing', palette: ['#46301f', '#ffc66d'],
        description: 'Imani helps racing teams keep their telemetry processor responsive.',
        voice: 'A pit-wall strategy log',
        acts: [
            {
                title: 'The Race Control Blackout',
                story: 'Championship qualifying was underway. Every racing team relied on a central telemetry system to process detailed performance data. The system could handle only a limited number of analyses simultaneously. As drivers attempted faster laps, teams began submitting more telemetry requests. When results were delayed, engineers submitted them again. Soon, the central processor was overwhelmed. Imani stared at her pit-wall screen. Her driver needed one important calculation, but it was competing with hundreds of other requests. The teams were trying to improve their performance by sending more data. Instead, they were making the system less responsive.',
                challenge: {
                    prompt: 'What is causing the telemetry processor to struggle?',
                    options: ['The race circuit has too many corners.', 'The cars are generating measurements too accurately.', 'Teams are submitting more simultaneous analyses and retries than the processor can manage.'],
                    answer: 2,
                    explanation: 'Uncontrolled concurrent requests can overwhelm server admission capacity. Additional retries can aggravate an overloaded system.'
                }
            },
            {
                title: 'Smart Pit-Wall Controls',
                story: 'Imani proposed a new protocol. When the central processor reported overload, each team’s telemetry console would reduce the number of analyses it could submit simultaneously. If the console reached its local limit, another submission attempt would be rejected immediately. The engineers could decide which calculations to attempt again later. Instead of flooding Race Control with every new analysis, teams began respecting the processing capacity available. The change didn’t make the processor faster. It prevented the teams from making its workload unmanageable.',
                challenge: {
                    prompt: 'Why is limiting requests at the pit wall effective?',
                    options: ['It increases the central processor’s computing power.', 'It prevents excess requests from contributing to congestion before they reach the processor.', 'It guarantees every team’s calculations finish in the same amount of time.'],
                    answer: 1,
                    explanation: 'OJP client-side throttling acts in the JDBC driver before requests travel to the server. It protects against overload without increasing database capacity.'
                }
            },
            {
                title: 'The Final Qualifying Lap',
                story: 'The telemetry system recovered with five minutes remaining. Several teams wanted to remove all request limits before their final runs. Imani knew what would happen. If every team simultaneously submitted its backlog, Race Control could become overwhelmed again. Instead, the consoles increased their concurrency limits gradually. The engineers received the analyses they needed without recreating the original traffic jam. As the checkered flag fell, Imani realized that winning wasn’t about generating the most data. It was about getting useful work done.',
                challenge: {
                    prompt: 'What should the telemetry consoles do during recovery?',
                    options: ['Increase concurrency progressively and react to renewed overload.', 'Immediately allow every team to submit its entire backlog.', 'Permanently limit every team to one analysis regardless of system capacity.'],
                    answer: 0,
                    explanation: 'Adaptive throttling responds to changes in the server’s observed capacity, allowing concurrency to recover cautiously rather than in a sudden burst.'
                }
            }
        ],
        victory: 'Imani’s team took pole position. Their breakthrough was not more processing power, but better control over when to use it.'
    },
    {
        id: 'floodgate-engineering', name: 'The Request Storm', genre: 'Engineering reality',
        badge: 'Backpressure Architect', icon: 'engineering', palette: ['#20384b', '#86d7f0'],
        description: 'An engineering team coordinates client and server behavior to contain overload.',
        voice: 'A production incident review',
        acts: [
            {
                title: 'When Scaling Makes Things Worse',
                story: 'A production system used eight application instances connected through OJP. Each application could issue multiple concurrent database operations. During a traffic surge, the OJP server’s admission capacity became saturated. Requests began waiting, and some timed out. Application error-handling logic retried certain operations, creating even more demand. The database continued processing work, but the increased arrival rate was outpacing what the system could accommodate. Adding more application instances would not automatically resolve the bottleneck. The engineering team needed to control the amount of work entering the shared infrastructure.',
                challenge: {
                    prompt: 'Why can additional application concurrency make an overloaded system less responsive?',
                    options: ['Adding more application threads automatically increases database processing capacity.', 'Excess work and retries can increase admission waits, timeouts, and overall contention.', 'Every timeout means the database has permanently rejected future connections.'],
                    answer: 1,
                    explanation: 'Server-side admission control protects finite connection capacity, but excessive incoming concurrency can still lead to admission timeouts and overload cascades.'
                }
            },
            {
                title: 'Throttling Inside the JDBC Driver',
                story: 'The engineers examined OJP’s client-side reactive throttling. OJP servers communicated capacity and overload information to the JDBC driver. Under the default reactive mode, the driver could reduce the number of concurrent requests allowed from its application when overload was observed. If a new request exceeded that limit, the driver rejected it locally with a SQLException, instead of sending it to OJP. Applications still needed appropriate error-handling and retry policies. The important change was architectural: overload protection now extended all the way to the client.',
                challenge: {
                    prompt: 'What happens when a new request exceeds the client’s effective throttle limit?',
                    options: ['The JDBC driver rejects the attempt locally before sending it to the OJP server.', 'The JDBC driver always places the request in an unlimited local waiting queue.', 'The database automatically increases its connection limit to accommodate the request.'],
                    answer: 0,
                    explanation: 'OJP’s client throttle uses local in-flight request tracking and fail-fast rejection. Reactive mode uses observed server overload to adapt its concurrency limit.'
                }
            },
            {
                title: 'Adaptive Recovery',
                story: 'The team monitored the system after the initial surge. The server reported reduced effective capacity when admission timeouts were observed. Clients responded by tightening their limits. As successful work completed and pressure eased, OJP gradually increased its permitted concurrency. The system did not instantly return to unrestricted operation. The engineers also examined the configuration modes: reactive, proactive, and combined. They selected the behavior appropriate to their workload rather than assuming that one static limit would always be optimal. The incident review concluded that protecting the server meant coordinating behavior across both sides of the network.',
                challenge: {
                    prompt: 'Which statement accurately describes OJP’s client-throttling behavior?',
                    options: ['The reactive mode always guarantees every application an equal share of capacity before any overload occurs.', 'Throttling removes the need for server-side admission control and application error handling.', 'Reactive throttling responds to observed overload, while proactive and combined modes provide additional ways to enforce concurrency limits.'],
                    answer: 2,
                    explanation: 'OJP supports off, reactive, proactive, and combined modes. Reactive is the documented default and adapts to observed overload; it is not a strict per-client fairness guarantee.'
                }
            }
        ],
        victory: 'The system survived the next traffic surge with controlled client concurrency. The team had stopped treating overload as something only the server could handle.'
    }
];
