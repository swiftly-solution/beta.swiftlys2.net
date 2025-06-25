import { useEffect, useRef, useState } from 'react';

const sequence = [
    { type: 'command', text: 'sw plugins reload admins' },
    { type: 'output', text: "[Swiftly] [Plugin Reload] Plugin 'admins' has been succesfully reloaded." },
    { type: 'command', text: 'sw resmon enable' },
    { type: 'output', text: "[Swiftly] [Resource Monitor] Resource monitoring has been enabled." },
    { type: 'command', text: 'sw resmon save' },
    { type: 'output', text: "[Swiftly] [Resource Monitor] The profiler file has been saved to addons/swiftly/profilers/profiler.all.61a4a35d-8417-41c1-a31b-4a8a8878317b.json." },
    { type: 'command', text: 'sw config reload' },
    { type: 'output', text: '[Swiftly] [Configuration] You\'ve succesfully reloaded all the configurations for plugins.' },
];

const AutoConsole = () => {
    const [log, setLog] = useState<any[]>([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < sequence.length) {
            const { type, text } = sequence[index];
            let currentLine = '';
            let charIndex = 0;

            const typeLine = () => {
                if (charIndex < text.length) {
                    currentLine += text[charIndex];
                    const updatedLog = [...log];
                    if (updatedLog[index]) {
                        updatedLog[index].text = currentLine;
                    } else {
                        updatedLog.push({ type, text: currentLine });
                    }
                    setLog([...updatedLog]);
                    charIndex++;
                    setTimeout(typeLine, 30);
                } else {
                    setTimeout(() => setIndex((prev) => prev + 1), 500);
                }
            };

            typeLine();
        }
    }, [index]);

    return (
        <div className="bg-black text-green-400 text-base font-mono p-4 rounded-xl h-[350px] overflow-auto shadow-xl">
            {log.map((line, i) => (
                <div key={i}>
                    {line.type === 'command' ? (
                        <span className="text-white">$ {line.text}</span>
                    ) : (
                        <pre className="whitespace-pre-wrap">{line.text}</pre>
                    )}
                </div>
            ))}
        </div>
    );
};

export default AutoConsole;