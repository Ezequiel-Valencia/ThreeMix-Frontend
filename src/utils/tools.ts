export async function readStreamBody(stream: ReadableStream<Uint8Array>): Promise<string> {
    const reader = stream.getReader();
    let result = "";
    let decoder = new TextDecoder();
  
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      result += decoder.decode(value, { stream: true });
    }
  
    return result;
  }