require 'digest/md5'

# puts Digest::MD5::hexdigest('bgvyzdsv')

# puts Digest::MD5::hexdigest('abcdef609043')


hashStart = 'bgvyzdsv'
hashEnd = 1



def hashMiner(input)
  md5Output = Digest::MD5::hexdigest(input)
  6.times do |i|
    if md5Output[i] != '0'
      return false
    end
  end
  return md5Output
end


while (true)
  hashInput = hashStart + hashEnd.to_s
  result = hashMiner(hashInput)
  if (!result)
    hashEnd = hashEnd + 1
    puts hashEnd
  else
    puts 'result is ' + result
    puts 'hashEnd is ' + hashEnd.to_s
    break
  end
end